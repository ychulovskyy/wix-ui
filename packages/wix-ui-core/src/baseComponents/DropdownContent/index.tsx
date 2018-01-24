import * as React from 'react';
import * as classNames from 'classnames';
import style from './DropdownContent.st.css';
import {Option} from '../DropdownOption';

const NOT_HOVERED_INDEX = -1;

export interface DropdownContentProps {
  /** The dropdown options array */
  options: Array<Option>;
  /** A callback for when clicking an option */
  onOptionClick: (option: Option) => void;
  /** Array of the selected ids */
  selectedIds: Array<string | number>;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Maximum height of the component */
  maxHeight?: number;
  /** Classes for the component */
  className?: string;
}

export interface DropdownContentState {
  hoveredIndex: number;
}

/**
 * DropdownContent
 */
export class DropdownContent extends React.PureComponent<DropdownContentProps, DropdownContentState> {

  static displayName = 'DropdownContent';
  static defaultProps = {
    maxHeight: 260
  };

  private optionsContainerRef: HTMLDivElement;

  constructor(props) {
    super(props);

    this.state = {
      hoveredIndex: NOT_HOVERED_INDEX
    };
  }

  onOptionClick(option: Option) {
    this.props.onOptionClick(option);
  }

  setHoveredIndex(index: number) {
    if (this.state.hoveredIndex !== index) {
      this.setState({
        hoveredIndex: index
      });
    }
  }

  isValidOptionForSelection(option: Option) {
    return option.isSelectable && !option.isDisabled;
  }

  hoverNextItem(interval: number) {
    const {options} = this.props;
    if (!options.find(this.isValidOptionForSelection)) {
      return;
    }

    let {hoveredIndex} = this.state;
    while (true) {
      hoveredIndex += interval;
      if (hoveredIndex === options.length) {
        hoveredIndex = 0;
      } else if (hoveredIndex < 0) {
        hoveredIndex = options.length - 1;
      }

      if (this.isValidOptionForSelection(options[hoveredIndex])) {
        break;
      }
    }

    if (this.optionsContainerRef) {
      const hoveredOption = this.optionsContainerRef.childNodes[hoveredIndex] as HTMLElement;
      const hoveredOptionHeight = hoveredOption.offsetHeight;
      const hoveredOptionTop = hoveredOption.offsetTop - 1;

      const {scrollTop: optionsContainerScrollTop, clientHeight: optionsContainerClientHeight} = this.optionsContainerRef;

      // If hovered option is not visible
      if (!(optionsContainerScrollTop <= hoveredOptionTop && (optionsContainerScrollTop + optionsContainerClientHeight) > hoveredOptionTop + hoveredOptionHeight)) {
        if (this.optionsContainerRef.scrollTop < hoveredOptionTop) {
          this.optionsContainerRef.scrollTop = hoveredOptionHeight + hoveredOptionTop - optionsContainerClientHeight;
        } else {
          this.optionsContainerRef.scrollTop = hoveredOptionTop;
        }
      }
    }

    this.setHoveredIndex(hoveredIndex);
  }

  onKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    switch (evt.key) {
      case 'Enter': {
        const {options} = this.props;
        const {hoveredIndex} = this.state;
        if (hoveredIndex >= 0 && hoveredIndex < options.length) {
          this.onOptionClick(options[hoveredIndex]);
        }
        return;
      }
      case 'ArrowUp': {
        return this.hoverNextItem(-1);
      }
      case 'ArrowDown': {
        return this.hoverNextItem(1);
      }
      default: return;
    }
  }

  generateOptionClasses(option: Option, index: number) {
    const {selectedIds} = this.props;
    const {hoveredIndex} = this.state;

    const isDisabled = option.isDisabled;
    const isHovered = !isDisabled && hoveredIndex === index;
    const isSelected = !isDisabled && (selectedIds || []).includes(option.id);
    const isSelectedAndHovered = isHovered && isSelected;

    return classNames(style.option, {
      [style.optionSelected]: isSelected,
      [style.optionHover]: isHovered,
      [style.optionDisabled]: isDisabled,
      [style.optionSelectedAndHovered]: isSelectedAndHovered
    });
  }

  render() {
    const {fixedHeader, fixedFooter, options, maxHeight} = this.props;

    return (
      <div
        {...style('root', {}, this.props)}
        data-hook="dropdown-content"
        tabIndex={1000}>
        {fixedHeader}
        {
          <div
            style={{maxHeight: `${maxHeight}px`}}
            className={style.optionsContainer}
            ref={optionsContainer => this.optionsContainerRef = optionsContainer}>
            {
              (options || []).map((option, index) => (
                <div
                  data-hook="option"
                  key={option.id}
                  className={this.generateOptionClasses(option, index)}
                  onClick={this.isValidOptionForSelection(option) ? () => this.onOptionClick(option) : null}
                  onMouseEnter={this.isValidOptionForSelection(option) ? () => this.setHoveredIndex(index) : null}>
                  {option.render()}
                </div>
              ))
            }
          </div>
        }
        {fixedFooter}
      </div>
    );
  }
}
