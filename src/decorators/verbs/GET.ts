import {HttpVerb} from '../../HttpVerb';
import {IRouteOptions} from '../../IRouteOptions';
import {Koaster} from '../../Koaster';

export function GET(path: string): Function;
export function GET(options: IRouteOptions): Function;
export function GET(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): void;
export function GET(...args: any[]): Function | void {
	if (args.length === 3) {
		Koaster.addRoute(HttpVerb.GET, args[0], args[2]);
	} else {
		return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
			Koaster.addRoute(HttpVerb.GET, target, descriptor, args[0]);
		}
	}
}
