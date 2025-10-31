import { RunnableSequence } from '@langchain/core/runnables';
import { retrieveDocuments } from '@chatapp/supabase';
import { standAloneQuestionTemplate, answerTemplate } from '@chatapp/templates';
import { combineDocuments } from '@chatapp/combinedocuments';
import { llm } from '@chatapp/llm';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

const memory = new BufferMemory({
	memoryKey: 'chat_history',
	returnMessages: true,
	inputKey: 'question',
});

export const chain = RunnableSequence.from([
	async ({ question }) => {
		const standalone = await standAloneQuestionTemplate
			.pipe(llm)
			.pipe(new StringOutputParser())
			.invoke({ question });
		console.log(standalone);

		const docs = await retrieveDocuments.invoke(standalone);
		console.log(docs);

		const context = combineDocuments(docs);
		console.log(docs);

		return { question, context };
	},
	new ConversationChain({
		llm,
		prompt: answerTemplate,
		memory,
	}),
]);
