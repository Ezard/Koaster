import {HttpVerb} from '../../HttpVerb';
import {IRouteOptions} from '../../IRouteOptions';
import {Koaster} from '../../Koaster';

export function OPTIONS(path: string): Function;
export function OPTIONS(options: IRouteOptions): Function;
export function OPTIONS(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): void;
export function OPTIONS(...args: any[]): Function | void {
	if (args.length === 3) {
		Koaster.addRoute(HttpVerb.OPTIONS, args[0], args[2]);
	} else {
		return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
			Koaster.addRoute(HttpVerb.OPTIONS, target, descriptor, args[0]);
		}
	}
}
