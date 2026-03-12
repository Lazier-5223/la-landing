"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

type FormData = Record<string, string>;

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const YEARS = ["2026年", "2027年"];

const INITIAL_FORM: FormData = {
  wechatNickname: "",
  whenYear: "",
  whenMonth: "",
  howLong: "",
  childIdentity: "",
  childGrade: "",
  childPersonality: "",
  childEnglish: "",
  childInterests: "",
  familyAccompany: "",
  avoidPitfalls: "",
  avoidPitfallsOther: "",
  accommodationPreference: "",
  pastExperienceYesNo: "",
  pastExperienceDetail: "",
  anythingElse: "",
};

export default function FormPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "提交失败，请稍后再试");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("网络异常，请检查网络后重试");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded border border-olive/20 bg-white text-olive placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brown/40 focus:border-brown font-sans text-sm";
  const selectBase =
    "w-full px-4 py-3 rounded border border-olive/20 bg-white text-olive focus:outline-none focus:ring-2 focus:ring-brown/40 focus:border-brown font-sans text-sm appearance-none cursor-pointer";
  const labelClass = "block font-sans text-sm font-medium text-olive mb-2";
  const sectionTitleClass =
    "font-serif text-lg lg:text-xl font-semibold text-olive mb-6 py-2.5 px-4 rounded-md bg-olive/8 border-l-4 border-brown";

  if (submitted) {
    return (
      <>
        <Navbar standalone />
        <main className="min-h-screen bg-[#F9F8F6] pt-8 pb-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
            <p className="font-serif text-xl text-olive">
              信息已收到！我base在洛杉矶，有时差或在忙，我会尽快与您联系～
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar standalone />
      <main className="min-h-screen bg-[#F9F8F6] pt-8 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-10">
          <header className="mb-10">
            <h1 className="font-serif text-2xl sm:text-3xl text-olive mb-2">
              游学需求问卷 / Personalized Consultation
            </h1>
            <p className="font-sans text-sm text-olive/80 leading-relaxed">
              为给您提供最精准的方向&建议，请填写以下信息
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label htmlFor="wechatNickname" className={labelClass}>
                请备注您的微信昵称，方便我们与您对应
              </label>
              <input
                id="wechatNickname"
                type="text"
                className={inputBase}
                value={form.wechatNickname}
                onChange={(e) => update("wechatNickname", e.target.value)}
                placeholder="例如：阿垚在洛杉矶"
              />
            </div>

            <section>
              <h2 className={sectionTitleClass}>关于这次游学</h2>
              <div className="space-y-4">
                <label className={labelClass}>
                  计划什么时候来美国？计划待多久？
                </label>
                <div>
                  <span className="block font-sans text-xs text-olive/70 mb-1.5">计划几月来</span>
                  <div className="flex gap-2 sm:gap-3">
                    <select
                      aria-label="年份"
                      className={selectBase}
                      value={form.whenYear}
                      onChange={(e) => update("whenYear", e.target.value)}
                    >
                      <option value="">年份</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <select
                      aria-label="月份"
                      className={selectBase}
                      value={form.whenMonth}
                      onChange={(e) => update("whenMonth", e.target.value)}
                    >
                      <option value="">月份</option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <span className="block font-sans text-xs text-olive/70 mb-1.5">计划待多久</span>
                  <input
                    id="howLong"
                    type="text"
                    className={inputBase}
                    value={form.howLong}
                    onChange={(e) => update("howLong", e.target.value)}
                    placeholder="例如：约 3 周"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className={sectionTitleClass}>孩子的画像</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>
                    确认下孩子的身份情况：旅游签证还是美宝？
                  </label>
                  <div className="flex flex-wrap gap-4 pt-1">
                    <label className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer">
                      <input
                        type="radio"
                        name="childIdentity"
                        value="旅游签证"
                        checked={form.childIdentity === "旅游签证"}
                        onChange={(e) => update("childIdentity", e.target.value)}
                        className="w-4 h-4 text-brown border-olive/30 focus:ring-brown/40"
                      />
                      旅游签证
                    </label>
                    <label className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer">
                      <input
                        type="radio"
                        name="childIdentity"
                        value="美宝"
                        checked={form.childIdentity === "美宝"}
                        onChange={(e) => update("childIdentity", e.target.value)}
                        className="w-4 h-4 text-brown border-olive/30 focus:ring-brown/40"
                      />
                      美宝
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="childGrade" className={labelClass}>
                    孩子目前几年级呢？
                  </label>
                  <input
                    id="childGrade"
                    type="text"
                    className={inputBase}
                    value={form.childGrade}
                    onChange={(e) => update("childGrade", e.target.value)}
                    placeholder="例如：小学三年级"
                  />
                </div>

                <div>
                  <label htmlFor="childPersonality" className={labelClass}>
                    孩子的性格是哪一类？
                  </label>
                  <p className="font-sans text-xs text-olive/70 mb-2">
                    是那种很快就能跟小朋友打成一片的&#39;自来熟&#39;，还是比较&#39;慢热&#39;的类型？。
                  </p>
                  <textarea
                    id="childPersonality"
                    rows={3}
                    className={`${inputBase} resize-y min-h-[80px]`}
                    value={form.childPersonality}
                    onChange={(e) => update("childPersonality", e.target.value)}
                    placeholder="请简单描述"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    孩子的英文交流能力，您觉得目前在哪个阶段？
                  </label>
                  <p className="font-sans text-xs text-olive/70 mb-2">
                    是只能蹦单词、听简单的，还是能日常沟通，或者是口语特别好、跟外国人聊天完全没障碍？
                  </p>
                  <div className="flex flex-col gap-2.5 pt-1">
                    {[
                      "只能蹦单词、听简单的",
                      "能日常沟通",
                      "口语特别好、跟外国人聊天完全没障碍",
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="childEnglish"
                          value={opt}
                          checked={form.childEnglish === opt}
                          onChange={(e) => update("childEnglish", e.target.value)}
                          className="w-4 h-4 text-brown border-olive/30 focus:ring-brown/40"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="childInterests" className={labelClass}>
                    孩子有没有什么特别喜爱的兴趣，或者想尝试的新鲜事？
                  </label>
                  <p className="font-sans text-xs text-olive/70 mb-2">
                    音乐、艺术、体育、户外运动、电脑编程、机器人、戏剧等。
                  </p>
                  <textarea
                    id="childInterests"
                    rows={3}
                    className={`${inputBase} resize-y min-h-[80px]`}
                    value={form.childInterests}
                    onChange={(e) => update("childInterests", e.target.value)}
                    placeholder="请简单描述"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className={sectionTitleClass}>在地生活需求</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="familyAccompany" className={labelClass}>
                    这次是您一家人亲自陪同吗，几口人呢？
                  </label>
                  <input
                    id="familyAccompany"
                    type="text"
                    className={inputBase}
                    value={form.familyAccompany}
                    onChange={(e) => update("familyAccompany", e.target.value)}
                    placeholder="例如：一家三口"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    除了申请学校，您还希望我帮您&quot;避坑&quot;的是哪部分？
                    <span className="ml-2 font-medium text-brown">可多选</span>
                  </label>
                  <div className="flex flex-col gap-2.5 pt-1">
                    {[
                      "选个住着舒服省心的地方",
                      "对接靠谱的租车",
                      "安排当地人的小众玩法，不只打卡",
                      "其他",
                    ].map((opt) => {
                      const selected = form.avoidPitfalls.split(",").filter(Boolean);
                      const checked = selected.includes(opt);
                      return (
                        <label
                          key={opt}
                          className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={opt}
                            checked={checked}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...selected, opt].join(",")
                                : selected.filter((v) => v !== opt).join(",");
                              update("avoidPitfalls", next);
                            }}
                            className="w-4 h-4 rounded text-brown border-olive/30 focus:ring-brown/40"
                          />
                          {opt}
                        </label>
                      );
                    })}
                  </div>
                  {form.avoidPitfalls.split(",").filter(Boolean).includes("其他") && (
                    <div className="mt-3">
                      <input
                        type="text"
                        className={inputBase}
                        value={form.avoidPitfallsOther}
                        onChange={(e) => update("avoidPitfallsOther", e.target.value)}
                        placeholder="例如线下陪同熟悉社区、游学期间遇到疑问或紧急情况即使响应等"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    关于住宿区域，您目前的偏好是？
                  </label>
                  <div className="flex flex-wrap gap-4 pt-1">
                    <label className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer">
                      <input
                        type="radio"
                        name="accommodationPreference"
                        value="感受全真美式社区"
                        checked={form.accommodationPreference === "感受全真美式社区"}
                        onChange={(e) => update("accommodationPreference", e.target.value)}
                        className="w-4 h-4 text-brown border-olive/30 focus:ring-brown/40"
                      />
                      感受全真美式社区
                    </label>
                    <label className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer">
                      <input
                        type="radio"
                        name="accommodationPreference"
                        value="华人占比高的社区"
                        checked={form.accommodationPreference === "华人占比高的社区"}
                        onChange={(e) => update("accommodationPreference", e.target.value)}
                        className="w-4 h-4 text-brown border-olive/30 focus:ring-brown/40"
                      />
                      华人占比高的社区
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className={sectionTitleClass}>过往与隐忧</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>
                    孩子以前来过美国，或者参加过营地活动吗？
                  </label>
                  <div className="flex flex-wrap gap-4 pt-1 mb-4">
                    <label className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer">
                      <input
                        type="radio"
                        name="pastExperienceYesNo"
                        value="是"
                        checked={form.pastExperienceYesNo === "是"}
                        onChange={(e) => update("pastExperienceYesNo", e.target.value)}
                        className="w-4 h-4 text-brown border-olive/30 focus:ring-brown/40"
                      />
                      是
                    </label>
                    <label className="flex items-center gap-2 font-sans text-sm text-olive cursor-pointer">
                      <input
                        type="radio"
                        name="pastExperienceYesNo"
                        value="否"
                        checked={form.pastExperienceYesNo === "否"}
                        onChange={(e) => update("pastExperienceYesNo", e.target.value)}
                        className="w-4 h-4 text-brown border-olive/30 focus:ring-brown/40"
                      />
                      否
                    </label>
                  </div>
                  {form.pastExperienceYesNo === "是" && (
                    <div className="mt-3">
                      <p className="font-sans text-xs text-olive/70 mb-2">
                        想看看他以前的体验如何，哪些是他喜欢的，哪些是您可以跳过的坑。
                      </p>
                      <textarea
                        id="pastExperienceDetail"
                        rows={3}
                        className={`${inputBase} resize-y min-h-[80px]`}
                        value={form.pastExperienceDetail}
                        onChange={(e) => update("pastExperienceDetail", e.target.value)}
                        placeholder="请简单描述"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="anythingElse" className={labelClass}>
                    还有什么特别想交代给我的事吗？
                  </label>
                  <textarea
                    id="anythingElse"
                    rows={3}
                    className={`${inputBase} resize-y min-h-[80px]`}
                    value={form.anythingElse}
                    onChange={(e) => update("anythingElse", e.target.value)}
                    placeholder="选填"
                  />
                </div>
              </div>
            </section>

            <div className="pt-4 space-y-2">
              {submitError && (
                <p className="font-sans text-sm text-red-600">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-brown text-white font-sans text-sm font-medium rounded transition-all duration-200 hover:bg-brown/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brown/50 focus:ring-offset-2 focus:ring-offset-[#F9F8F6] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "提交中…" : "提交问卷"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
