import { act, create, ReactTestRenderer, ReactTestRendererTree } from "react-test-renderer";
import ProfileStatusWithHooks, {TProps} from "./ProfileStatusWithHooks";

describe("ProfileStatusWithHooks component", () => {
    test("status from props should be in the state", () => {
      
        let mockCallback = jest.fn()
        let component = create(<ProfileStatusWithHooks status="it-kamasutra.com"  />)
        let tree = component.toTree();
        expect(tree?.props.status).toBe("it-kamasutra.com");

    });
    
    test("after creation span should be displayed", () => {

          const mockCallback = jest.fn() 
          const component = create(<ProfileStatusWithHooks status="it-kamasutra.com"  />)
          const root = component.root
          expect(() => { root.findByType('input') }).toThrow()

      });

      test("after creation span should be equal status", () => {

          const mockCallback = jest.fn()
          const component = create(<ProfileStatusWithHooks status="it-kamasutra.com"  />)
          const root = component.root
          let span = root.findByType('span')
          expect(span.children[0]).toBe('it-kamasutra.com');
      });

      test("input should be displayed in editMode", () => {
        
          const mockCallback = jest.fn()
          const component = create(<ProfileStatusWithHooks status="it-kamasutra.com"   />)
          const root = component.root
          let span = root.findByType('span')
          act(() =>{ span.props.onDoubleClick() })
          let input = root.findByType('input')
          expect(input.props.value).toBe("it-kamasutra.com")
        
      });

      test("callback should be call", () => {
       
          const mockCallback = jest.fn()
        
          const component = create(<ProfileStatusWithHooks status="it-kamasutra.com" />)
        
          const root = component.root

          let span = root.findByType('span')
          act(() =>{ span.props.onDoubleClick() })

          let input = root.findByType('input')

          act(() =>{ input.props.onBlur() })

          expect(mockCallback.mock.calls.length).toBe(1) 
      });

});