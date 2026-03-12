import { NextResponse } from "next/server";
import { Resend } from "resend";

const FIELD_LABELS: Record<string, string> = {
  wechatNickname: "微信昵称",
  whenYear: "计划来的年份",
  whenMonth: "计划来的月份",
  howLong: "计划待多久",
  childIdentity: "孩子身份情况",
  childGrade: "孩子目前年级",
  childPersonality: "孩子性格",
  childEnglish: "孩子英文交流能力",
  childInterests: "孩子兴趣或想尝试的事",
  familyAccompany: "是否亲自陪同及人数",
  avoidPitfalls: "希望避坑的部分",
  avoidPitfallsOther: "避坑·其他（补充）",
  accommodationPreference: "住宿区域偏好",
  pastExperienceYesNo: "以前来过美国或参加过营地",
  pastExperienceDetail: "以往体验描述",
  anythingElse: "其他想交代的事",
};

function buildEmailBody(data: Record<string, string>): string {
  const lines: string[] = ["【游学需求问卷】新提交\n"];
  for (const [key, value] of Object.entries(data)) {
    if (value == null || String(value).trim() === "") continue;
    const label = FIELD_LABELS[key] || key;
    const val = String(value).replace(/\n/g, " ");
    lines.push(`${label}：${val}`);
  }
  return lines.join("\n");
}

export async function POST(request: Request) {
  const to = process.env.QUESTIONNAIRE_EMAIL;
  if (!to) {
    return NextResponse.json(
      { error: "QUESTIONNAIRE_EMAIL 未配置" },
      { status: 500 }
    );
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY 未配置" },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const body = (await request.json()) as Record<string, string>;
    const text = buildEmailBody(body);

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM ?? "游学问卷 <onboarding@resend.dev>",
      to: [to],
      subject: "【游学需求问卷】新提交",
      text,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "发送失败";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
