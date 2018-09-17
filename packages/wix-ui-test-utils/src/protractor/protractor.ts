import {$, ElementFinder} from 'protractor';

export function protractorTestkitFactoryCreator<T> (driverFactory: (e: ElementFinder) => T) {
  return (obj: {dataHook: string, wrapper?: ElementFinder}) =>
    obj.wrapper ? driverFactory(obj.wrapper.$(`[data-hook='${obj.dataHook}']`)) : driverFactory($(`[data-hook='${obj.dataHook}']`));
}
