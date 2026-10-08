import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AppIcon } from '@/components/app-icon';
import { EditProfileModal } from '@/components/edit-profile-modal';

export default function ProfileScreen() {
  // State for profile information with user details
  const [name, setName] = useState('Thivanka Tharuka');
  const [email, setEmail] = useState('thivankatharuka36@gmail.com');
  const [points, setPoints] = useState(0);
  const [isVerified, setIsVerified] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Animation values
  const pointsScale = useSharedValue(1);
  const fabScale = useSharedValue(1);
  const plusOneOpacity = useSharedValue(0);
  const plusOneTranslateY = useSharedValue(0);

  // Animated styles
  const animatedPointsStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pointsScale.value }],
  }));

  const animatedFabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const animatedPlusOneStyle = useAnimatedStyle(() => ({
    opacity: plusOneOpacity.value,
    transform: [{ translateY: plusOneTranslateY.value }],
  }));

  // Handle FAB press: increment points by 1 with animations
  const handleFabPress = () => {
    // 1. FAB click bounce effect
    fabScale.value = withSequence(
      withTiming(0.85, { duration: 60 }),
      withSpring(1, { damping: 4, stiffness: 220 })
    );

    // 2. Points counter bounce effect
    pointsScale.value = withSequence(
      withTiming(1.35, { duration: 100 }),
      withSpring(1, { damping: 5, stiffness: 220 })
    );

    // 3. Floating "+1" indicator
    plusOneTranslateY.value = 0;
    plusOneOpacity.value = 1;
    plusOneTranslateY.value = withTiming(-18, { duration: 550 });
    plusOneOpacity.value = withTiming(0, { duration: 550 });

    // 4. Increment the state count
    setPoints((prev) => prev + 1);
  };

  // Handle Email tap to open mail client
  const handleEmailPress = async () => {
    const url = `mailto:${email}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert('Email', email);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>My Profile</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Main Content Body */}
      <View style={styles.body}>
        {/* Profile Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsEditModalVisible(true)}
            style={styles.avatarContainer}>
            {/* Coral/Pink outline ring */}
            <View style={styles.avatarRing}>
              <Image
                source={require('@/assets/images/avatar.jpg')}
                style={styles.avatarImage}
                contentFit="cover"
                transition={300}
              />
            </View>

            {/* Verification Checkmark Badge */}
            {isVerified && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsVerified((v) => !v)}
                style={styles.checkmarkBadge}>
                <AppIcon name="check" size={18} color="#00C853" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>

        {/* Horizontal Divider Line */}
        <View style={styles.divider} />

        {/* Profile Information List */}
        <View style={styles.infoSection}>
          {/* Name Field */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{name}</Text>
          </View>

          {/* Email Field */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleEmailPress}
              style={styles.iconValueRow}>
              <View style={styles.iconWrapper}>
                <AppIcon name="mail" size={18} color="#000000" />
              </View>
              <Text style={styles.infoValueRowText}>{email}</Text>
            </TouchableOpacity>
          </View>

          {/* Points Field */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Points</Text>
            <View style={styles.iconValueRow}>
              <View style={styles.iconWrapper}>
                <AppIcon name="star" size={18} color="#000000" />
              </View>
              <Animated.Text style={[styles.infoValueRowText, animatedPointsStyle]}>
                {points}
              </Animated.Text>
              {/* Floating +1 Indicator */}
              <Animated.View style={[styles.plusOneBadge, animatedPlusOneStyle]}>
                <Text style={styles.plusOneText}>+1</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>

      {/* Floating Action Button (FAB) */}
      <Animated.View style={[styles.fabContainer, animatedFabStyle]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.fab}
          onPress={handleFabPress}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          onLongPress={() => setIsEditModalVisible(true)}>
          <AppIcon name="plus" size={26} color="#ffffff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Interactive Edit Modal */}
      <EditProfileModal
        visible={isEditModalVisible}
        initialName={name}
        initialEmail={email}
        initialPoints={points}
        onClose={() => setIsEditModalVisible(false)}
        onSave={(updatedName, updatedEmail, updatedPoints) => {
          setName(updatedName);
          setEmail(updatedEmail);
          setPoints(updatedPoints);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  header: {
    backgroundColor: '#000000',
    width: '100%',
  },
  headerSafeArea: {
    backgroundColor: '#000000',
  },
  headerContent: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  body: {
    flex: 1,
    paddingTop: 28,
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    width: 146,
    height: 146,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRing: {
    width: 146,
    height: 146,
    borderRadius: 73,
    borderWidth: 1.8,
    borderColor: '#FF8A80',
    padding: 3,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
  checkmarkBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#ffffff',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  divider: {
    height: 1.5,
    backgroundColor: '#262626',
    marginHorizontal: 22,
    marginBottom: 28,
  },
  infoSection: {
    paddingHorizontal: 22,
    gap: 22,
  },
  infoItem: {
    gap: 6,
  },
  infoLabel: {
    fontSize: 19,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2A2A2A',
  },
  iconValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoValueRowText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2A2A2A',
  },
  plusOneBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 6,
  },
  plusOneText: {
    color: '#00E676',
    fontSize: 12,
    fontWeight: '800',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    zIndex: 999,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
