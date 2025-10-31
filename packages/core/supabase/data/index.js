import { OllamaEmbeddings } from '@langchain/ollama';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API;

const embeddings = new OllamaEmbeddings({ model: 'nomic-embed-text:latest' });
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const vectorstore = new SupabaseVectorStore(embeddings, {
	client: supabaseClient,
	tableName: 'documents',
	queryName: 'match_documents',
});

export const retrieveDocuments = vectorstore.asRetriever(3);
