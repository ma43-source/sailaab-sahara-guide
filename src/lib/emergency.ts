const EMERGENCY_REGEX =
  /rescue|1122|trapped|stuck|stranded|injured|drowning|drowned|emergency|roof|rising water|can'?t get out|help me|زخمی|پھنسے|پھنسا|پھنس|ریسکیو|ہنگامی|خطرہ|ڈوب|چھت|پانی بڑھ/i;

export function isEmergencySituation(situation: string): boolean {
  return EMERGENCY_REGEX.test(situation);
}
