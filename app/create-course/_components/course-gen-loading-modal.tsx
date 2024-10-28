import { outfit } from "@/app/fonts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CourseGenLoadingModalProps {
  isLoadingCourseGen: boolean;
  progress: {
    total: number;
    completed: number;
    currentChapter: string;
    errors: Array<{ chapter: string; error: string }>;
    youtubeQuotaExceeded: boolean;
  };
}

export function CourseGenLoadingModal({
  isLoadingCourseGen,
  progress,
}: CourseGenLoadingModalProps) {
  return (
    <Dialog open={isLoadingCourseGen}>
      <DialogContent className={`sm:max-w-screen-sm ${outfit.className}`}>
        <DialogHeader>
          <DialogTitle>Generating Course Content</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <div>
                Processing Chapter:{" "}
                <p className="text-black/85">{progress.currentChapter}</p>
              </div>

              {progress.youtubeQuotaExceeded && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-2">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        YouTube API quota exceeded. Continuing without video
                        content. Please try after 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                Progress: {progress.completed} / {progress.total} chapters
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 animate-pulse"
                  style={{
                    width: `${(progress.completed / progress.total) * 100}%`,
                  }}
                />
              </div>

              {progress.errors.length > 0 && (
                <div className="mt-4">
                  <div className="text-red-500 font-medium mb-2">
                    Generation Errors:
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {progress.errors.map((error, index) => (
                      <div
                        key={index}
                        className="text-sm bg-red-50 text-red-700 p-2 rounded"
                      >
                        <span className="font-medium">{error.chapter}:</span>{" "}
                        {error.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
