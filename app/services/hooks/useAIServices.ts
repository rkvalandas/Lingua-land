import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export interface AIServiceRequest {
  text: string;
  language?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface AIServiceResponse {
  result: string;
  originalText: string;
  language?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface ServiceState {
  isLoading: boolean;
  result: string;
  error: string | null;
  inputText: string;
  language: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const useAIServices = () => {
  const { user, token } = useAuth();

  const [grammarState, setGrammarState] = useState<ServiceState>({
    isLoading: false,
    result: "",
    error: null,
    inputText: "",
    language: "English",
    sourceLanguage: "English",
    targetLanguage: "Spanish",
  });

  const [translatorState, setTranslatorState] = useState<ServiceState>({
    isLoading: false,
    result: "",
    error: null,
    inputText: "",
    language: "English",
    sourceLanguage: "English",
    targetLanguage: "Spanish",
  });

  const [summariserState, setSummariserState] = useState<ServiceState>({
    isLoading: false,
    result: "",
    error: null,
    inputText: "",
    language: "English",
    sourceLanguage: "English",
    targetLanguage: "Spanish",
  });

  const [paraphraserState, setParaphraserState] = useState<ServiceState>({
    isLoading: false,
    result: "",
    error: null,
    inputText: "",
    language: "English",
    sourceLanguage: "English",
    targetLanguage: "Spanish",
  });

  const makeAPICall = async (
    endpoint: string,
    data: AIServiceRequest
  ): Promise<AIServiceResponse> => {
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Request failed");
    }

    return await response.json();
  };

  const checkGrammar = async (text: string, language: string = "English") => {
    if (!user || !text.trim()) return;

    setGrammarState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await makeAPICall("grammar-check", { text, language });
      setGrammarState((prev) => ({
        ...prev,
        isLoading: false,
        result: response.result,
        inputText: text,
        language,
      }));
    } catch (error) {
      setGrammarState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };

  const translateText = async (
    text: string,
    sourceLanguage: string = "English",
    targetLanguage: string = "Spanish"
  ) => {
    if (!user || !text.trim()) return;

    setTranslatorState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await makeAPICall("translate", {
        text,
        sourceLanguage,
        targetLanguage,
      });
      setTranslatorState((prev) => ({
        ...prev,
        isLoading: false,
        result: response.result,
        inputText: text,
        sourceLanguage,
        targetLanguage,
      }));
    } catch (error) {
      setTranslatorState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };

  const summariseText = async (text: string, language: string = "English") => {
    if (!user || !text.trim()) return;

    setSummariserState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await makeAPICall("summarise", { text, language });
      setSummariserState((prev) => ({
        ...prev,
        isLoading: false,
        result: response.result,
        inputText: text,
        language,
      }));
    } catch (error) {
      setSummariserState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };

  const paraphraseText = async (text: string, language: string = "English") => {
    if (!user || !text.trim()) return;

    setParaphraserState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await makeAPICall("paraphrase", { text, language });
      setParaphraserState((prev) => ({
        ...prev,
        isLoading: false,
        result: response.result,
        inputText: text,
        language,
      }));
    } catch (error) {
      setParaphraserState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };

  const updateInputText = (service: string, text: string) => {
    switch (service) {
      case "grammar":
        setGrammarState((prev) => ({ ...prev, inputText: text }));
        break;
      case "translator":
        setTranslatorState((prev) => ({ ...prev, inputText: text }));
        break;
      case "summariser":
        setSummariserState((prev) => ({ ...prev, inputText: text }));
        break;
      case "paraphraser":
        setParaphraserState((prev) => ({ ...prev, inputText: text }));
        break;
    }
  };

  const updateLanguage = (service: string, language: string) => {
    switch (service) {
      case "grammar":
        setGrammarState((prev) => ({ ...prev, language }));
        break;
      case "translator":
        setTranslatorState((prev) => ({ ...prev, targetLanguage: language }));
        break;
      case "summariser":
        setSummariserState((prev) => ({ ...prev, language }));
        break;
      case "paraphraser":
        setParaphraserState((prev) => ({ ...prev, language }));
        break;
    }
  };

  const updateSourceLanguage = (language: string) => {
    setTranslatorState((prev) => ({ ...prev, sourceLanguage: language }));
  };

  const clearResult = (service: string) => {
    const clearState = { result: "", error: null };
    switch (service) {
      case "grammar":
        setGrammarState((prev) => ({ ...prev, ...clearState }));
        break;
      case "translator":
        setTranslatorState((prev) => ({ ...prev, ...clearState }));
        break;
      case "summariser":
        setSummariserState((prev) => ({ ...prev, ...clearState }));
        break;
      case "paraphraser":
        setParaphraserState((prev) => ({ ...prev, ...clearState }));
        break;
    }
  };

  return {
    grammarState,
    translatorState,
    summariserState,
    paraphraserState,
    checkGrammar,
    translateText,
    summariseText,
    paraphraseText,
    updateInputText,
    updateLanguage,
    updateSourceLanguage,
    clearResult,
  };
};
