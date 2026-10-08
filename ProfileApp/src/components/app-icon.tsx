import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';

export type IconName = 'mail' | 'star' | 'plus' | 'check' | 'edit' | 'close' | 'refresh';

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const SYMBOL_MAPPING: Record<
  IconName,
  { ios: string; android: string; web: string; fallback: string }
> = {
  mail: {
    ios: 'envelope.fill',
    android: 'mail',
    web: 'mail',
    fallback: '✉',
  },
  star: {
    ios: 'star.fill',
    android: 'star',
    web: 'star',
    fallback: '★',
  },
  plus: {
    ios: 'plus',
    android: 'add',
    web: 'add',
    fallback: '+',
  },
  check: {
    ios: 'checkmark',
    android: 'check',
    web: 'check',
    fallback: '✓',
  },
  edit: {
    ios: 'pencil',
    android: 'edit',
    web: 'edit',
    fallback: '✎',
  },
  close: {
    ios: 'xmark',
    android: 'close',
    web: 'close',
    fallback: '✕',
  },
  refresh: {
    ios: 'arrow.clockwise',
    android: 'refresh',
    web: 'refresh',
    fallback: '↻',
  },
};

export function AppIcon({ name, size = 20, color = '#000000' }: AppIconProps) {
  const config = SYMBOL_MAPPING[name];

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <SymbolView
        name={{
          ios: config.ios as any,
          android: config.android as any,
          web: config.web as any,
        }}
        size={size}
        tintColor={color}
        fallback={
          <Text
            style={{
              fontSize: size * 0.9,
              color,
              lineHeight: size,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {config.fallback}
          </Text>
        }
      />
    </View>
  );
}
