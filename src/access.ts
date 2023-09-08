import { InitialStateType } from '@/services/_Foundation/_typings';

export default (initialState: InitialStateType) => {
  const checkAccess = (abilities: string): boolean => {
    return initialState?.access ? initialState.access[abilities] : false;
  };

  const allAbilities = [
    'manage_my_team',
    'manage_all_team',
    'manage_access',
    'manage_audits',
  ];

  let access: { [key: string]: boolean } = {};
  allAbilities.forEach((item) => {
    access[item] = checkAccess(item) || false;
  });

  return access;
};
