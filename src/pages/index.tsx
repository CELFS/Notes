import {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';

export default function Home() {
  const history = useHistory();
  
  useEffect(() => {
    history.replace('/Notes/docs/');
  }, [history]);
  
  // 返回空组件，因为重定向会立即执行
  return null;
}
