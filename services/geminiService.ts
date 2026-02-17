
import { GoogleGenAI, Type } from "@google/genai";
import { MedicineDetails } from "../types";

export const getMedicineDetails = async (imageData: string): Promise<MedicineDetails> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageData.split(',')[1],
          },
        },
        {
          text: `تعرف على الدواء الموجود في الصورة أو من خلال الباركود الظاهر. 
          قدم المعلومات باللغة العربية. إذا لم يكن دواءً، اطلب تصوير علبة دواء.
          Return a JSON object containing details about the medicine found in the image.`,
        }
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'اسم الدواء التجاري' },
          scientificName: { type: Type.STRING, description: 'الاسم العلمي للدواء' },
          manufacturer: { type: Type.STRING, description: 'الشركة المصنعة' },
          strength: { type: Type.STRING, description: 'تركيز الدواء' },
          activeIngredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'المواد الفعالة'
          },
          indications: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'دواعي الاستعمال'
          },
          dosage: { type: Type.STRING, description: 'طريقة الاستخدام والجرعة المعتادة' },
          sideEffects: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'الآثار الجانبية المحتملة'
          },
          warnings: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'تحذيرات وموانع الاستعمال'
          },
          isPrescriptionNeeded: { type: Type.BOOLEAN, description: 'هل يتطلب وصفة طبية؟' },
        },
        required: ["name", "scientificName", "activeIngredients", "indications", "dosage", "sideEffects", "warnings", "isPrescriptionNeeded"]
      },
      systemInstruction: "أنت صيدلي خبير ومساعد ذكاء اصطناعي متخصص في تحليل صور الأدوية والباركود. مهمتك هي استخراج أدق التفاصيل من الصورة وتقديمها بشكل منظم وموثوق للمستخدم. دائماً أضف تنبيهاً بضرورة استشارة الطبيب."
    }
  });

  const text = response.text;
  if (!text) throw new Error("Could not parse medicine details");
  
  return JSON.parse(text) as MedicineDetails;
};
