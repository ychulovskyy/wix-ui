import {ComponentType, ReactNode} from 'react';

interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
}

interface ConsumerProps<T> {
    children: (value: T) => ReactNode;
    unstable_observedBits?: number;
}

export type Provider<T> = ComponentType<ProviderProps<T>>;
export type Consumer<T> = ComponentType<ConsumerProps<T>>;
export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
}

export type createContext<T> = (
    defaultValue: T,
    calculateChangedBits?: (prev: T, next: T) => number
) =>  Context<T>;