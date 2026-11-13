import { ScrollView, Text, View, StyleSheet, Linking, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown, useReducedMotion } from "react-native-reanimated";
import { tokens } from "../theme/tokens.js";

const { color, space, radius, shadow } = tokens;

const MEMBERS = [
  { name: "MUHAMMAD ZERO ONE TAUHIDA", nim: "21120124120014", role: "Frontend & UI" },
  { name: "NANDITA DINDA INDRASWARI", nim: "21120124120015", role: "Backend & Database" },
  { name: "ISNA IMA SOLEKHAH", nim: "21120124120020", role: "IoT & Sensor Simulator" },
  { name: "LAILA MUTIARA", nim: "21120124120028", role: "Dokumentasi & Testing" },
];

const APP_INFO = {
  matkul: "Pemrograman Perangkat Bergerak",
  modul: "Modul 6 — IoT & Real-time Monitoring",
  kelompok: "Kelompok 22",
  tahun: "2026",
};

function MemberCard({ member, index }) {
  const reduceMotion = useReducedMotion();
  const delay = index * 60;

  return (
    <Animated.View
      entering={
        reduceMotion
          ? undefined
          : FadeInDown.duration(260).delay(delay)
      }
      style={styles.memberCard}
    >
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>
          {member.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </Text>
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberNim}>{member.nim}</Text>
        <Text style={styles.memberRole}>{member.role}</Text>
      </View>
    </Animated.View>
  );
}

export function ProfileScreen() {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Header Card */}
      <Animated.View
        entering={reduceMotion ? undefined : FadeInDown.duration(260)}
        style={styles.headerCard}
      >
        <View style={styles.appIconWrap}>
          <Ionicons name="thermometer" size={36} color={color.primary} />
        </View>
        <Text style={styles.appName}>LiveTemp</Text>
        <Text style={styles.appTagline}>Real-time IoT Temperature Monitor</Text>

        <View style={styles.divider} />

        <View style={styles.infoGrid}>
          {Object.entries(APP_INFO).map(([key, val]) => (
            <View key={key} style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {key === "matkul"
                  ? "Mata Kuliah"
                  : key === "modul"
                    ? "Modul"
                    : key === "kelompok"
                      ? "Kelompok"
                      : "Tahun"}
              </Text>
              <Text style={styles.infoValue}>{val}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Members Section */}
      <Animated.View
        entering={
          reduceMotion ? undefined : FadeInDown.duration(260).delay(80)
        }
        style={styles.sectionHeader}
      >
        <Ionicons name="people-outline" size={18} color={color.text3} />
        <Text style={styles.sectionTitle}>Anggota Kelompok</Text>
      </Animated.View>

      {MEMBERS.map((member, index) => (
        <MemberCard key={member.nim} member={member} index={index + 2} />
      ))}

      {/* Tech Stack */}
      <Animated.View
        entering={
          reduceMotion
            ? undefined
            : FadeInDown.duration(260).delay(MEMBERS.length * 60 + 120)
        }
        style={styles.techCard}
      >
        <View style={styles.sectionHeader}>
          <Ionicons name="code-slash-outline" size={18} color={color.text3} />
          <Text style={styles.sectionTitle}>Tech Stack</Text>
        </View>

        <View style={styles.techGrid}>
          {[
            { icon: "logo-react", label: "React Native + Expo" },
            { icon: "server-outline", label: "Node.js + Express" },
            { icon: "leaf-outline", label: "PostgreSQL (Neon)" },
            { icon: "radio-outline", label: "MQTT (HiveMQ)" },
          ].map((tech) => (
            <View key={tech.label} style={styles.techChip}>
              <Ionicons name={tech.icon} size={16} color={color.primary} />
              <Text style={styles.techLabel}>{tech.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: space.lg,
    paddingBottom: 40,
    gap: space.md,
    backgroundColor: color.bg,
  },
  headerCard: {
    backgroundColor: color.surface,
    borderRadius: radius.card,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: color.border,
    padding: space.xl,
    alignItems: "center",
    gap: space.sm,
    boxShadow: shadow.card,
  },
  appIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    borderCurve: "continuous",
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space.sm,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: color.text,
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 14,
    color: color.text2,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: color.border,
    marginVertical: space.sm,
  },
  infoGrid: {
    width: "100%",
    gap: space.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: space.md,
  },
  infoLabel: {
    fontSize: 13,
    color: color.text3,
    fontWeight: "500",
    minWidth: 90,
  },
  infoValue: {
    fontSize: 13,
    color: color.text,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    marginTop: space.sm,
    marginBottom: space.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: color.text,
  },
  memberCard: {
    backgroundColor: color.surface,
    borderRadius: radius.card,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: color.border,
    padding: space.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    boxShadow: shadow.card,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: {
    color: color.onPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  memberInfo: {
    flex: 1,
    gap: 2,
  },
  memberName: {
    fontSize: 15,
    fontWeight: "700",
    color: color.text,
  },
  memberNim: {
    fontSize: 13,
    color: color.text3,
    fontVariant: ["tabular-nums"],
  },
  memberRole: {
    fontSize: 13,
    color: color.primary,
    fontWeight: "500",
    marginTop: 2,
  },
  techCard: {
    backgroundColor: color.surface,
    borderRadius: radius.card,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: color.border,
    padding: space.lg,
    gap: space.sm,
    boxShadow: shadow.card,
  },
  techGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },
  techChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EFF6FF",
    borderRadius: radius.pill,
    borderCurve: "continuous",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  techLabel: {
    fontSize: 13,
    color: color.primary,
    fontWeight: "600",
  },
});

