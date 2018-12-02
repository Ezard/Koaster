import {HttpVerb} from '../../HttpVerb';
import {IRouteOptions} from '../../IRouteOptions';
import {Koaster} from '../../Koaster';

export function POST(path: string): Function;
export function POST(options: IRouteOptions): Function;
export function POST(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): void;
export function POST(...args: any[]): Function | void {
	if (args.length === 3) {
		Koaster.addRoute(HttpVerb.POST, args[0], args[2]);
	} else {
		return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
			Koaster.addRoute(HttpVerb.POST, target, descriptor, args[0]);
		}
	}
}
