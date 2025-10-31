import { readFile } from 'fs/promises';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OllamaEmbeddings } from '@langchain/ollama';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API = process.env.SUPABASE_API;

try {
	const text = await readFile(`${process.cwd()}/TechNova.txt`, 'utf-8');
	const text_splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 900,
		separators: ['\n\n', '\n', ' ', ''],
		chunkOverlap: 100,
	});

	const splittedText = await text_splitter.createDocuments([text]);

	const supaBaseClient = createClient(SUPABASE_URL, SUPABASE_API);

	await SupabaseVectorStore.fromDocuments(
		splittedText,
		new OllamaEmbeddings({ model: 'nomic-embed-text' }),
		{ client: supaBaseClient, tableName: 'documents' }
	);
} catch (error) {
	console.log(error);
}
