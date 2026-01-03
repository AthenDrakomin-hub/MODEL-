
/**
 * AI 支持功能已移除。
 * 项目将不再调用 @google/genai 相关接口。
 */
export async function getSupportResponse(
  _history: any[],
  _userInput: string
): Promise<string> {
  return "AI 客服已关闭。请通过官网其他渠道联系我们。";
}
