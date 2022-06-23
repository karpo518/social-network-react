import { FC } from "react";


type TProps = {
  style: any
}

const TestComponent: FC<TProps> = ({style} ) => {
  console.log('Отрисовка Test')
  return (
    <div style={style}> </div>
  );
};

(TestComponent as any).whyDidYouRender = true
export default TestComponent;
