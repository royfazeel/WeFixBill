import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.19, 1, 0.22, 1] // Expo ease out
    }
  }
}

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
}

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.19, 1, 0.22, 1] 
    }
  }
}

export const slideInFromLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.19, 1, 0.22, 1] 
    }
  }
}

export const slideInFromRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.19, 1, 0.22, 1] 
    }
  }
}

export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
}

export const staggerContainerFast: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    }
  }
}

// Float animation for buttons (will be disabled on mobile)
export const floatAnimation = {
  y: [0, -4, 0],
  transition: {
    y: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Hover animations
export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.25, ease: [0.19, 1, 0.22, 1] }
}

export const hoverLift = {
  y: -4,
  scale: 1.02,
  transition: { duration: 0.25, ease: [0.19, 1, 0.22, 1] }
}

// Tap animations
export const tapScale = {
  scale: 0.97
}

// Page transition variants
export const pageTransition: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: 'easeOut' 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    }
  }
}
