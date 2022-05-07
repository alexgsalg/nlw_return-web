import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../server/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType,
  onRestartRequest: () => void,
  onFeedbackSent: () => void,
}

export function FeedbackContentStep({ feedbackType, onRestartRequest, onFeedbackSent }: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('')
  const [isLoadingFeedbackBtn, setIsLoadingFeedbackBtn] = useState(false)

  const feedbackTypesInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(ev: FormEvent) {
    ev.preventDefault();

    setIsLoadingFeedbackBtn(true);
    // console.log('submit', {
      //   screenshot,
      //   comment,
      // })
      await api.post('feedbacks', {
        type: feedbackType,
        comment,
        screenshot,
      })
      
      onFeedbackSent();
      setIsLoadingFeedbackBtn(false);
  }

  return (
    <>
      <header>
        <button 
          type="button" 
          className="absolute left-5 top-5 text-zinc-400 hover:text-zinc-100"
          onClick={onRestartRequest}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="flex items-center gap-2 text-xl leading-6">
          <img className="w-6 h-6" src={feedbackTypesInfo.image.source} alt={feedbackTypesInfo.image.alt} />
          {feedbackTypesInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm text-zinc-100 placeholder-zinc-100 border-zinc-600 bg-transparent rounded-md focus:outline-none focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          name="feedbackArea" 
          id="feedbackArea"
          onChange={event => setComment(event.target.value)}
          placeholder="Conte com detalhes o que está acontecendo..."
        />
        <footer className="flex items-center gap-2 mt-2">
          <ScreenshotButton 
            screenshot={screenshot}
            onScreenShotTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isLoadingFeedbackBtn}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
            { isLoadingFeedbackBtn ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
