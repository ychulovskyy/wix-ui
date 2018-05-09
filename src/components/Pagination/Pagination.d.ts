/// <reference types="react" />
import * as React from 'react';
export declare const getId: (idPrefix?: string, name?: string) => string;
export declare const calculateWidth: (totalPages: number) => string;
export interface PaginationProps {
    totalPages: number;
    currentPage?: number;
    pageUrl?: (pageNumber: number) => string;
    onChange?: (event: {
        event: React.SyntheticEvent<Element>;
        page: number;
    }) => void;
    paginationMode?: 'pages' | 'input';
    showFirstLastNavButtons?: boolean;
    firstLabel?: React.ReactNode;
    previousLabel?: React.ReactNode;
    nextLabel?: React.ReactNode;
    lastLabel?: React.ReactNode;
    gapLabel?: React.ReactNode;
    slashLabel?: React.ReactNode;
    rtl?: boolean;
    width?: number;
    showFirstPage?: boolean;
    showLastPage?: boolean;
    showInputModeTotalPages?: boolean;
    responsive?: boolean;
    maxPagesToShow?: number;
    id?: string;
    updateResponsiveLayout?: (callback: () => void) => void;
    style?: React.CSSProperties;
}
export interface PaginationState {
    pageInputValue: string;
    pageInputHasError: boolean;
}
export declare class Pagination extends React.Component<PaginationProps, PaginationState> {
    static propTypes: Object;
    static defaultProps: Partial<PaginationProps>;
    updateRootMinWidth: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private getId(elementName?);
    private readonly maxPagesToShow;
    state: {
        pageInputValue: string;
        pageInputHasError: boolean;
    };
    private renderPageStrip();
    private handlePageInputChange;
    private handlePageInputKeyDown;
    private handlePageInputBlur;
    private handlePageClick;
    private handlePageKeyDown;
    private renderPageForm();
    private renderNavButton(type);
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
