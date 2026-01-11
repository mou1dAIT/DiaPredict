import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDiabetesPrediction } from "./api";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function TestSection() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    bmi: "",
    age: "",
    hba1c: "",
    glucose: ""
  });

  const questions = [
    { id: "bmi", label: "What is your BMI?", placeholder: "e.g. 24.5", unit: "kg/m²" },
    { id: "age", label: "How old are you?", placeholder: "e.g. 45", unit: "years" },
    { id: "hba1c", label: "What is your HbA1c level?", placeholder: "e.g. 5.7", unit: "%" },
    { id: "glucose", label: "Your Blood Glucose level?", placeholder: "e.g. 120", unit: "mg/dL" }
  ];

  const currentFieldId = questions[step].id;
  const isValueEmpty = !formData[currentFieldId] || formData[currentFieldId] === "";

  const handleNext = async () => {
    if (!isValueEmpty) {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setLoading(true);
        try {
          const data = await getDiabetesPrediction(formData);
          setResult(data);
        } catch (err) {
          alert("Error: Make sure your Django server is running on localhost:8000");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(0);
    setFormData({ bmi: "", age: "", hba1c: "", glucose: "" });
  };

  return (
    <section id="test" className="min-h-screen bg-[#FAF7F2] pt-40 pb-20 flex items-start justify-center px-4 relative overflow-hidden">
      
     
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-8 md:p-12 border border-emerald-50 relative z-10">
        
        
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 rounded-t-[40px] overflow-hidden">
          {!result && (
            <motion.div 
              className="h-full bg-[#34FFC8]"
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Step {step + 1} of {questions.length}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {questions[step].label}
                </h2>
              </div>

              <div className="relative group">
                <input
                  type="number"
                  autoFocus
                  value={formData[currentFieldId]}
                  placeholder={questions[step].placeholder}
                  className={`w-full text-2xl md:text-3xl p-8 bg-slate-50 rounded-[24px] border-2 outline-none transition-all duration-300 
                    ${isValueEmpty ? "border-transparent focus:border-slate-200" : "border-emerald-500 bg-white shadow-sm"}`}
                  onChange={(e) => setFormData({...formData, [currentFieldId]: e.target.value})}
                />
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 font-bold bg-white border border-slate-100 px-4 py-2 rounded-xl text-sm">
                  {questions[step].unit}
                </span>
              </div>

              <div className="pt-4">
                <button
                  disabled={isValueEmpty || loading}
                  onClick={handleNext}
                  className={`w-full py-6 rounded-[24px] font-black text-xl transition-all duration-300 transform
                    ${isValueEmpty || loading 
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed" 
                      : "bg-[#065F46] text-white hover:bg-[#047857] shadow-xl shadow-emerald-900/20 active:scale-[0.97]"
                    }`}
                >
                  {loading ? "Analyzing..." : (step === questions.length - 1 ? "Get Final Analysis" : "Continue")}
                </button>
                {step > 0 && !loading && (
                  <button onClick={() => setStep(step - 1)} className="w-full mt-4 text-slate-400 text-sm font-bold hover:text-slate-600">
                    Go Back
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-6"
            >
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl shadow-inner ${result.result === 1 ? 'bg-red-50' : 'bg-emerald-50'}`}>
                {result.result === 1 ? <FaExclamationTriangle /> : <FaCheckCircle />}
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Analysis Result</h3>
                <h2 className={`text-4xl font-black ${result.result === 1 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {result.result === 1 ? "Diabetes Detected" : "Low Risk"}
                </h2>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Based on your HbA1c ({formData.hba1c}%) and Glucose ({formData.glucose} mg/dL), The model estimated the risk with <strong>{result.probability}%</strong> accuracy.
                </p>
              </div>
              <button 
                onClick={handleReset}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
              >
                Start New Test
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}