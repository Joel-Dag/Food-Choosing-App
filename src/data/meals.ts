import { FoodItem } from "../types/meal";

export const BREAKFAST_LIST = [
  "እንቁላል ሳንድዊች",
  "ፍርፍር",
  "በሶ",
  "ገንፎ"
];

export const HABESHA_MAINS: FoodItem[] = [
  { id: "h1", name: "ምስር ወጥ" },
  { id: "h2", name: "አተር ክክ ወጥ" },
  { id: "h3", name: "ሽሮ ወጥ" },
  { id: "h4", name: "ድንች ወጥ" },
  { id: "h5", name: "ምንቸት አብሽ ወጥ", isExpensive: true },
  { id: "h6", name: "ስጋ ወጥ", isExpensive: true },
];

export const FOREIGN_MAINS: FoodItem[] = [
  { id: "f1", name: "ፓስታ በስጎ" },
  { id: "f2", name: "ፓስታ በአትክልት" },
  { id: "f3", name: "መኮረኒ በስጎ" },
  { id: "f4", name: "ሾርባ ፓስታ" },
  { id: "f5", name: "ፓስታ ላ ፉርኖ", isVeryExpensive: true },
];

export const SIDE_DISHES: FoodItem[] = [
  { id: "s1", name: "ሀበሻ ጎመን" },
  { id: "s2", name: "ድንች በካሮት" },
  { id: "s3", name: "አተር ክክ አልጫ" },
  { id: "s4", name: "ጥቅል ጎመን" },
  { id: "s5", name: "ቀይ ስር" },
  { id: "s6", name: "ቆስጣ" },
  { id: "s7", name: "ሽሮ አልጫ" },
  { id: "s8", name: "ቲማቲም ቁርጥ" },
  { id: "s9", name: "ድፍን ምስር አልጫ" },
  { id: "s10", name: "ድንች በስጋ አልጫ", isExpensive: true },
];