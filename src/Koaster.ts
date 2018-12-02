import * as Router from 'koa-router';
import {IMiddleware} from 'koa-router';
import 'reflect-metadata';
import {HttpVerb} from './HttpVerb';
import {IKoasterOptions} from './IKoasterOptions';
import {IRouteGroupOptions} from './IRouteGroupOptions';
import {IRouteOptions} from './IRouteOptions';

export class Koaster {
	static ROUTE_GROUP_OPTIONS_KEY = "koaster:routeGroupOptions";
	static ROUTE_VERB_KEY = "koaster:routeVerb";
	static routes = new Map<object, IRouteOptions[]>();

	public static addRoute(verb: HttpVerb, target: any, descriptor: PropertyDescriptor, pathOrOptions?: string | IRouteOptions): Function | void {
		let options: IRouteOptions;
		if (pathOrOptions) {
			if (typeof pathOrOptions === 'string') {
				options = {path: pathOrOptions};
			} else {
				options = pathOrOptions;
			}
		} else {
			options = {path: ''};
		}

		Reflect.defineMetadata(Koaster.ROUTE_VERB_KEY, verb, options);
		options.action = options.action || descriptor.value;
		const group = target.prototype;
		const array = Koaster.routes.get(group) || [];
		array.push(options);
		Koaster.routes.set(group, array);
	}

	static addRouteGroup(group: object, options: IRouteGroupOptions) {
		Reflect.defineMetadata(Koaster.ROUTE_GROUP_OPTIONS_KEY, options, group);
	}
}

export function koaster(options: IKoasterOptions) {
	const router = new Router();
	Koaster.routes.forEach((routes, group) => {
		const groupOptions: IRouteGroupOptions = Reflect.getMetadata(Koaster.ROUTE_GROUP_OPTIONS_KEY, group) || {};

		const routeList: string[] = [];

		routes.forEach(route => {
			let middleware: Array<IMiddleware> = [];
			middleware = middleware.concat(route.action!);
			const path = (options.path || '') + (groupOptions.path || '') + (route.path || '');
			const verb = Reflect.getMetadata(Koaster.ROUTE_VERB_KEY, route) as HttpVerb;

			const key = `${verb}-${path}`;
			if (routeList.indexOf(key) !== -1) {
				console.error(`Route clash: ${HttpVerb[verb]}, ${path}`);
			} else {
				routeList.push(key);
			}

			switch (verb) {
				case HttpVerb.DELETE:
					router.delete(path, ...middleware);
					break;
				case HttpVerb.GET:
					router.get(path, ...middleware);
					break;
				case HttpVerb.OPTIONS:
					router.options(path, ...middleware);
					break;
				case HttpVerb.PATCH:
					router.patch(path, ...middleware);
					break;
				case HttpVerb.POST:
					router.post(path, ...middleware);
					break;
				case HttpVerb.PUT:
					router.put(path, ...middleware);
					break;
			}
		})
	});
	return router.routes();
}
