import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeftIcon,
  HStack,
  IconButton,
  Text,
} from 'native-base';
import React from 'react';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const navigation = useNavigation();
  return (
    <HStack alignItems={'center'} py={5}>
      {navigation.canGoBack() && <IconButton icon={<ChevronLeftIcon />} />}
      <Text flex={1} color="white" fontSize={20}>
        {title}
      </Text>
      <EllipsisVerticalIcon color="white" />
    </HStack>
  );
}
