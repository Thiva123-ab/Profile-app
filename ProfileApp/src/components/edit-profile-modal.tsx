import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

interface EditProfileModalProps {
  visible: boolean;
  initialName: string;
  initialEmail: string;
  initialPoints: number;
  onClose: () => void;
  onSave: (name: string, email: string, points: number) => void;
}

export function EditProfileModal({
  visible,
  initialName,
  initialEmail,
  initialPoints,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [points, setPoints] = useState(initialPoints.toString());

  // Reset local state when modal opens
  React.useEffect(() => {
    if (visible) {
      setName(initialName);
      setEmail(initialEmail);
      setPoints(initialPoints.toString());
    }
  }, [visible, initialName, initialEmail, initialPoints]);

  const handleSave = () => {
    const parsedPoints = parseInt(points, 10);
    onSave(name.trim() || initialName, email.trim() || initialEmail, isNaN(parsedPoints) ? 0 : Math.max(0, parsedPoints));
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardView}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              {/* Name Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Points Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Points</Text>
                <View style={styles.pointsRow}>
                  <TextInput
                    style={[styles.textInput, styles.pointsInput]}
                    value={points}
                    onChangeText={setPoints}
                    placeholder="0"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.quickAddBtn}
                    onPress={() => {
                      const current = parseInt(points, 10) || 0;
                      setPoints((current + 5).toString());
                    }}>
                    <Text style={styles.quickAddText}>+5 pts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.quickAddBtn}
                    onPress={() => {
                      const current = parseInt(points, 10) || 0;
                      setPoints((current + 10).toString());
                    }}>
                    <Text style={styles.quickAddText}>+10 pts</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  keyboardView: {
    width: '100%',
    maxWidth: 420,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pointsInput: {
    flex: 1,
  },
  quickAddBtn: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },
  quickAddText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
  cancelBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },
  saveBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#000000',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});
