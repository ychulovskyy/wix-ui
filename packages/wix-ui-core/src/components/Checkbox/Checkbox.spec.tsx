import * as React from 'react';
import {checkboxDriverFactory} from './Checkbox.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
// import * as stylable from 'stylable';
import Checkbox from './Checkbox';

const tickSVG: React.ReactNode = (
  <svg
    data-hook="CHECKBOX_TICKMARK"
    data-name="custom-tickmark"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="black" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6" />
  </svg>
);

// tslint:disable-next-line:ban
describe.only('Checkbox', () => {

  const createDriver = createDriverFactory(checkboxDriverFactory);

  it('Renders with default values', async () => {
    const checkbox = createDriver(<Checkbox />);

    expect(checkbox.exists()).toBe(true);
    expect(checkbox.isChecked()).toBe(false);
  });

  it('Displays children', async () => {
    const checkbox = createDriver(
      <Checkbox>
        <span>covfefe</span>
      </Checkbox>
    );

    expect(checkbox.children()[0].textContent).toContain('covfefe');
  });

  // it('Aligns children and box icon', async () => {
  //   const checkbox = createDriver(
  //     <Checkbox>
  //       <span>yoyo</span>
  //     </Checkbox>
  //   );

  //   expect(checkbox.children()[0].textContent).toContain('yoyo');
  //   // expect([checkbox.box, checkbox.children()[0]]).to.be.verticallyAligned('bottom', 5);
  // });

  it('Displays custom tick mark when value is true', async () => {
    const checkbox = createDriver(
      <Checkbox
        tickIcon={tickSVG}
        checked={true}
      />
    );

    expect(checkbox.tickmark()).toBeDefined();
    expect(checkbox.tickmark().getAttribute('data-name')).toBe('custom-tickmark');
  });

  it('Calls onChange when clicked', async () => {
    const onChange = jest.fn();

    const checkbox = createDriver(
      <Checkbox
        tickIcon={tickSVG}
        checked={true}
        onChange={onChange}
      />
    );

    expect(checkbox.exists()).toBe(true);

    checkbox.click();

    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0].checked).toBe(false);
  });

  // it('Switches to focus state when focused', async () => {
  //   const { driver: checkbox, waitForDom } = clientRenderer.render(
  //     <CheckBox value={true} />
  //   ).withDriver(CheckBoxTestDriver);

  //   checkbox.focus();
  //   await waitForDom(() => {
  //     expect(checkbox.hasStylableState('focus')).to.equal(true);
  //   });
  // });

  it('Accepts "name" prop', async () => {
    const checkbox = createDriver(
      <Checkbox name="shlomi" />
    );

    expect(checkbox.input().getAttribute('name')).toBe('shlomi');
  });

  it('Accepts "autofocus" prop', async () => {
    if (document.hasFocus()) {

      const checkbox = createDriver(
        <Checkbox autoFocus />
      );

      expect(document.activeElement).toBe(checkbox.input());
      // expect(checkbox.hasStylableState('focus')).to.equal(true);

    } else {
      console.warn(// tslint:disable-line no-console
        'Checkbox autofocus test wasn\'t run since document doesn\'t have focus'
      );
    }
  });

  describe('Accessibility features', () => {
    it('Renders a native input and pass on checked state', async () => {
      const checkbox = createDriver(
        <Checkbox checked />
      );

      const nativeInput = checkbox.input();

      expect(nativeInput).toBeDefined();
      expect(nativeInput).toBeInstanceOf(HTMLInputElement);
      expect(nativeInput.getAttribute('type')).toBe('checkbox');
      expect(nativeInput.getAttribute('checked')).toBe(true);
    });

  //   it('native input gets disabled state', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox disabled />
  //     ).withDriver(CheckBoxTestDriver);

  //     const nativeInput = checkbox.nativeInput;

  //     await waitForDom(() => {
  //       expect(nativeInput, 'native checkbox should be disabled').to.have.attribute('disabled');
  //     });
  //   });

  //   it('native input gets id prop if supplied by user', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox id="covfefe" />
  //     ).withDriver(CheckBoxTestDriver);

  //     const nativeInput = checkbox.nativeInput;

  //     await waitForDom(() => {
  //       expect(nativeInput, 'native checkbox should have id').to.have.attribute('id', 'covfefe');
  //     });
  //   });

  //   it('component gets tabIndex 0 by default', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(<CheckBox />).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.nativeInput).to.have.attribute('tabIndex', '0');
  //     });
  //   });

  //   it('component gets tabIndex supplied by the user', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox tabIndex={99998} />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.nativeInput).to.have.attribute('tabIndex', '99998');
  //     });
  //   });

  //   it('takes "aria-controls" property', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox aria-controls={['123', '345']} />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.nativeInput).to.have.attribute('aria-controls', '123,345');
  //     });
  //   });

  //   it('gets focus after click (should not be in focused style state)', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => expect(checkbox.root).to.be.present());

  //     checkbox.click();
  //     await waitForDom(() => {
  //       expect(document.activeElement).to.equal(checkbox.nativeInput);
  //       expect(checkbox.hasStylableState('focus'), 'checkbox should not look focused').to.equal(false);
  //     });
  //   });

  //   it('loses focused style state after click', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => expect(checkbox.root).to.be.present());

  //     checkbox.focus();
  //     await waitForDom(() =>
  //       expect(checkbox.hasStylableState('focus'), 'checkbox should look focused').to.equal(true)
  //     );

  //     checkbox.click();
  //     await waitForDom(() =>
  //       expect(checkbox.hasStylableState('focus'), 'checkbox should not look focused').to.equal(false)
  //     );
  //   });
  });

  // describe('When disabled', () => {
  //   it('doesn\'t call onChange when clicked', async () => {
  //     const onChange = sinon.spy();
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox disabled onChange={onChange} />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.root).to.be.present();
  //     });

  //     checkbox.click();
  //     await sleep(10);
  //     expect(onChange).to.not.have.been.called;
  //   });

  //   it('displays tickmark if value is true', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox disabled value={true} />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.isChecked()).to.equal(true);
  //     });
  //   });

  //   it('gets disabled style state', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox disabled />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.hasStylableState('disabled')).to.equal(true);
  //     });
  //   });

  //   it('displays indeterminate icon', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox disabled value={true} indeterminate />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.isIndeterminate()).to.equal(true);
  //     });
  //   });
  // });

  // describe('When readonly', () => {
  //   it('doesn\'t call onChange when clicked', async () => {
  //     const onChange = sinon.spy();
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox readOnly onChange={onChange} />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.root).to.be.present();
  //     });

  //     checkbox.click();
  //     await sleep(10);
  //     expect(onChange).to.not.have.been.called;
  //   });

  //   it('displays tickmark if value is true', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox readOnly value={true} />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.isChecked()).to.equal(true);
  //     });
  //   });

  //   it('gets readOnly style state', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox readOnly />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.hasStylableState('readonly')).to.equal(true);
  //     });
  //   });
  // });

  // describe('When error', () => {
  //   it('has error style state', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox error />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.hasStylableState('error')).to.equal(true);
  //     });
  //   });
  // });

  // describe('When indeterminate', () => {
  //   it('renders indeterminate icon when value is true', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox value={true} indeterminate />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.box).to.be.present();
  //       expect(checkbox.isIndeterminate()).to.equal(true);
  //       expect(checkbox.isChecked()).to.equal(false);
  //     });
  //   });

  //   it('renders indeterminate icon when value is false', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox value={false} indeterminate />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.box).to.be.present();
  //       expect(checkbox.isIndeterminate()).to.equal(true);
  //     });
  //   });

  //   it('click calls onChange with value true', async () => {
  //     const onChange = sinon.spy();
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox
  //         value={true}
  //         onChange={onChange}
  //         indeterminate
  //       />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.root).to.be.present();
  //     });

  //     checkbox.click();

  //     await waitFor(() => {
  //       expect(onChange).to.have.been.calledOnce;
  //       expect(onChange).to.have.been.calledWithMatch({ value: true });
  //     });
  //   });

  //   it('renders custom indeterminate icon', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox
  //         indeterminateIcon={IndeterminateSVG}
  //         indeterminate
  //       />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.isIndeterminate()).to.equal(true);
  //       expect(checkbox.indeterminateMark).to.have.attribute('data-name', 'custom-indeterminate');
  //     });
  //   });

  //   it('does not call onChange when disabled', async () => {
  //     const onChange = sinon.spy();
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox disabled onChange={onChange} indeterminate />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.root).to.be.present();
  //     });

  //     checkbox.click();
  //     await sleep(10);
  //     expect(onChange).to.not.have.been.called;
  //   });

  //   it('gets indeterminate style state', async () => {
  //     const { driver: checkbox, waitForDom } = clientRenderer.render(
  //       <CheckBox indeterminate />
  //     ).withDriver(CheckBoxTestDriver);

  //     await waitForDom(() => {
  //       expect(checkbox.hasStylableState('indeterminate')).to.equal(true);
  //     });
  //   });
  // });
});
