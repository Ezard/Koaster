import {HttpVerb} from '../../HttpVerb';
import {IRouteOptions} from '../../IRouteOptions';
import {Koaster} from '../../Koaster';

export function PATCH(path: string): Function;
export function PATCH(options: IRouteOptions): Function;
export function PATCH(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): void;
export function PATCH(...args: any[]): Function | void {
	if (args.length === 3) {
		Koaster.addRoute(HttpVerb.PATCH, args[0], args[2]);
	} else {
		return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
			Koaster.addRoute(HttpVerb.PATCH, target, descriptor, args[0]);
		}
	}
}
