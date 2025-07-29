import * as React from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current border-r-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-3",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
        ghost: "text-muted-foreground",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Optional text to display below the spinner
   */
  text?: string
  /**
   * Whether to center the spinner in its container
   */
  centered?: boolean
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, variant, text, centered = false, ...props }, ref) => {
    const spinnerElement = (
      <div
        className={cn(spinnerVariants({ size, variant }), className)}
        role="status"
        aria-label="Loading"
        {...props}
        ref={ref}
      />
    )

    if (text) {
      return (
        <div
          className={cn(
            "flex flex-col items-center gap-2",
            centered && "justify-center min-h-[200px]"
          )}
        >
          {spinnerElement}
          <span className="text-sm text-muted-foreground">{text}</span>
        </div>
      )
    }

    if (centered) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          {spinnerElement}
        </div>
      )
    }

    return spinnerElement
  }
)

LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner, spinnerVariants } 