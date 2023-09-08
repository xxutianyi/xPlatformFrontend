// 全局共享数据示例
import { APP_NAME } from "@/constants";
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(APP_NAME);
  return {
    name,
    setName,
  };
};

export default useUser;
