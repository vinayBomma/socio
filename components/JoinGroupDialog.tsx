import React from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

interface JoinGroupDialogProps {
  visible: boolean;
  onClose: () => void;
  onJoin: (code: string) => Promise<void>;
  loading: boolean;
  value: string;
  onChange: (text: string) => void;
}

const JoinGroupDialog: React.FC<JoinGroupDialogProps> = ({
  visible,
  onClose,
  onJoin,
  loading,
  value,
  onChange,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 24,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
            Join Group
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              width: "100%",
              padding: 12,
              fontSize: 16,
              marginBottom: 16,
            }}
            placeholder="Enter group code"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            editable={!loading}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                flex: 1,
                marginRight: 8,
              }}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#222",
                flex: 1,
                marginLeft: 8,
                opacity: loading ? 0.6 : 1,
              }}
              onPress={() => onJoin(value)}
              disabled={loading}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Joining..." : "Join"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JoinGroupDialog;
