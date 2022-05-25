import { create } from "react-test-renderer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

describe("ProfileStatusWithHooks component", () => {
    test("status from props should be in the state", () => {
      const component = create(<ProfileStatusWithHooks status="it-kamasutra.com" />);
      const instance = component.componentgetInstance();
      expect(instance.state.status).toBe("it-kamasutra.com");
    });
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatusWithHooks status="it-kamasutra.com" />)
        const root = component.root
        expect(() => { root.findByType('input') }).toThrow()
            
      });

      test("after creation span should be equal status", () => {
        const component = create(<ProfileStatusWithHooks status="it-kamasutra.com" />)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('it-kamasutra.com');
      });

      test("input should be displayed in editMode", () => {
        const component = create(<ProfileStatusWithHooks status="it-kamasutra.com" />)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe("it-kamasutra.com")
      });

      test("callback should be call", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatusWithHooks status="it-kamasutra.com" updateStatus={mockCallback} />)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
      });
});