import {HttpVerb} from '../../HttpVerb';
import {IRouteOptions} from '../../IRouteOptions';
import {Koaster} from '../../Koaster';

export function DELETE(path: string): Function;
export function DELETE(options: IRouteOptions): Function;
export function DELETE(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor): void;
export function DELETE(...args: any[]): Function | void {
	if (args.length === 3) {
		Koaster.addRoute(HttpVerb.DELETE, args[0], args[2]);
	} else {
		return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
			Koaster.addRoute(HttpVerb.DELETE, target, descriptor, args[0]);
		}
	}
}
