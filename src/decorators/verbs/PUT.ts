import {HttpVerb} from '../../HttpVerb';
import {IRouteOptions} from '../../IRouteOptions';
import {Koaster} from '../../Koaster';

export function PUT(path: string): Function;
export function PUT(options: IRouteOptions): Function;
export function PUT(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): void;
export function PUT(...args: any[]): Function | void {
	if (args.length === 3) {
		Koaster.addRoute(HttpVerb.PUT, args[0], args[2]);
	} else {
		return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
			Koaster.addRoute(HttpVerb.PUT, target, descriptor, args[0]);
		}
	}
}
