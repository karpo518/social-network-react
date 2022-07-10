import { Breadcrumb } from "antd";
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs()

    console.log(breadcrumbs)
    
    return (
      <Breadcrumb className={'crumbs'} >
        {breadcrumbs.map(({ breadcrumb }, index) => <Breadcrumb.Item key={index} >{ breadcrumb }</Breadcrumb.Item>)}
      </Breadcrumb>
    );
  }

export default Breadcrumbs;
