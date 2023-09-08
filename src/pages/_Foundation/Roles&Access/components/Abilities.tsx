import { DEFAULT_ROLE, ROOT_ROLE } from '@/constants';
import useMessage from '@/hooks/useMessage';
import useWindowSize from '@/hooks/useWindowSize';
import {
  abilitiesOptions,
  rolesShow,
  rolesUpdate,
} from '@/services/_Foundation/Roles&Access';
import { Model } from '@/services/_Foundation/_Model';
import { ProCard } from '@ant-design/pro-components';
import { Button, Checkbox, Col, Divider, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useEffect, useState } from 'react';

const groupedAbilities: (
  abilities: Model.Ability[],
) => Map<string, Model.Ability[]> = (abilities: Model.Ability[]) => {
  let abilitiesGroups: Map<string, Model.Ability[]> = new Map();

  abilities.forEach((item) => {
    const group = item.name.substring(0, item.name.indexOf('/'));

    if (!abilitiesGroups.has(group)) {
      abilitiesGroups.set(group, []);
    }

    if (item.name.startsWith(group)) {
      abilitiesGroups.get(group)?.push(item);
    }
  });

  return abilitiesGroups;
};

const Abilities: React.FC<{ selected?: string }> = (props) => {
  const message = useMessage();
  const { height } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Model.Role>();
  const [abilities, setAbilities] = useState<Model.Ability[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  useEffect(() => {
    fetchRoleAbilities();
  }, [props.selected]);

  useEffect(() => {
    setCurrentRole();
  }, [checkedList]);

  useEffect(() => {
    fetchAbilities();
  }, []);

  const ROLE_PROTECT =
    props.selected == ROOT_ROLE || props.selected == DEFAULT_ROLE;

  const checkAll =
    abilities.length === checkedList.length || props.selected == ROOT_ROLE;
  const checkDisabled = loading || !props.selected || ROLE_PROTECT;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(
      e.target.checked ? (abilities.map((item) => item.name) as string[]) : [],
    );
  };

  const fetchAbilities = () => {
    setLoading(true);
    abilitiesOptions().then((res) => {
      setAbilities(res.data);
      setLoading(false);
    });
  };

  const setCurrentRole = () => {
    if (role) {
      setRole({
        ...role,
        ability_names: (checkedList as string[]) ?? [],
      });
    }
  };

  const fetchRoleAbilities = () => {
    if (props.selected) {
      rolesShow({ role: props.selected }).then((res) => {
        setRole(res.data);
      });
      if (props.selected == ROOT_ROLE) {
        setCheckedList(abilities.map((item) => item.name));
      } else {
        setLoading(true);
        rolesShow({ role: props.selected }).then((res) => {
          setCheckedList(res.data.abilities.map((item) => item.name));
          setLoading(false);
        });
      }
    } else {
      setCheckedList([]);
    }
  };

  const saveAbilities = async () => {
    if (props.selected && role) {
      rolesUpdate({ role: props.selected }, role).then(() => {
        fetchRoleAbilities();
      });
      await message.success('权限更新成功');
    }
  };

  const SaveButton = () => (
    <Button
      type="primary"
      onClick={saveAbilities}
      loading={loading}
      disabled={checkDisabled}
    >
      更新权限
    </Button>
  );

  return (
    <ProCard
      bodyStyle={{ paddingBottom: 36, minHeight: height - 240 }}
      title="角色权限"
      extra={<SaveButton />}
    >
      <Checkbox
        onChange={onCheckAllChange}
        checked={checkAll}
        disabled={checkDisabled}
      >
        全部权限
      </Checkbox>
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={onChange}
        value={checkedList}
        disabled={checkAll || checkDisabled}
      >
        {Array.from(groupedAbilities(abilities)).map((item, index) => (
          <div key={index} className="w-full">
            <Divider />
            <Row gutter={[8, 24]}>
              {item[1].map((item) => (
                <Col key={item.name} span={6}>
                  <Checkbox className="text-sm" value={item.name}>
                    {item.title}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Checkbox.Group>
    </ProCard>
  );
};

export default Abilities;
