export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
}

export const books: Book[] = [
  // Value Investing
  {
    id: "intelligent-investor",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    category: "Value Investing",
    description: "The definitive book on value investing by Warren Buffett's mentor.",
  },
  {
    id: "security-analysis",
    title: "Security Analysis",
    author: "Benjamin Graham & David Dodd",
    category: "Value Investing",
    description: "The bible of fundamental analysis and value investing.",
  },
  {
    id: "the-little-book-that-beats-the-market",
    title: "The Little Book That Beats the Market",
    author: "Joel Greenblatt",
    category: "Value Investing",
    description: "The Magic Formula: a simple approach to finding good cheap stocks.",
  },
  {
    id: "margin-of-safety",
    title: "Margin of Safety",
    author: "Seth Klarman",
    category: "Value Investing",
    description: "Risk-averse value investing strategies for the thoughtful investor.",
  },
  {
    id: "value-investing-from-graham-to-buffett",
    title: "Value Investing: From Graham to Buffett and Beyond",
    author: "Bruce Greenwald",
    category: "Value Investing",
    description: "A modern framework for value investing used at Columbia Business School.",
  },

  // Stock Picking
  {
    id: "one-up-on-wall-street",
    title: "One Up on Wall Street",
    author: "Peter Lynch",
    category: "Stock Picking",
    description: "How to use what you already know to make money in the market.",
  },
  {
    id: "beating-the-street",
    title: "Beating the Street",
    author: "Peter Lynch",
    category: "Stock Picking",
    description: "Lynch shares how he picked stocks that beat the market for 13 years.",
  },
  {
    id: "common-stocks-uncommon-profits",
    title: "Common Stocks and Uncommon Profits",
    author: "Philip Fisher",
    category: "Stock Picking",
    description: "Fisher's 15-point checklist for finding great growth stocks.",
  },
  {
    id: "the-warren-buffett-way",
    title: "The Warren Buffett Way",
    author: "Robert Hagstrom",
    category: "Stock Picking",
    description: "Investment strategies of the world's greatest investor.",
  },

  // Growth Investing
  {
    id: "100-to-1-in-the-stock-market",
    title: "100 to 1 in the Stock Market",
    author: "Thomas Phelps",
    category: "Growth Investing",
    description: "How patient buy-and-hold investors can achieve 100x returns.",
  },
  {
    id: "the-outsiders",
    title: "The Outsiders",
    author: "William Thorndike",
    category: "Growth Investing",
    description: "Eight unconventional CEOs and their radically rational blueprint for success.",
  },

  // Index Investing
  {
    id: "little-book-common-sense-investing",
    title: "The Little Book of Common Sense Investing",
    author: "John C. Bogle",
    category: "Index Investing",
    description: "The case for low-cost index fund investing by the founder of Vanguard.",
  },
  {
    id: "a-random-walk-down-wall-street",
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    category: "Index Investing",
    description: "The classic guide arguing markets are efficient and index funds win.",
  },

  // Behavioral Finance
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Behavioral Finance",
    description: "How cognitive biases affect our financial decisions.",
  },
  {
    id: "the-psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Behavioral Finance",
    description: "Timeless lessons on wealth, greed, and happiness.",
  },
  {
    id: "misbehaving",
    title: "Misbehaving",
    author: "Richard Thaler",
    category: "Behavioral Finance",
    description: "The making of behavioral economics by the Nobel Prize winner.",
  },
  {
    id: "irrational-exuberance",
    title: "Irrational Exuberance",
    author: "Robert Shiller",
    category: "Behavioral Finance",
    description: "Why markets overshoot and how speculative bubbles form.",
  },

  // Trading
  {
    id: "market-wizards",
    title: "Market Wizards",
    author: "Jack D. Schwager",
    category: "Trading",
    description: "Interviews with top traders on what makes them consistently profitable.",
  },
  {
    id: "reminiscences-of-a-stock-operator",
    title: "Reminiscences of a Stock Operator",
    author: "Edwin Lefèvre",
    category: "Trading",
    description: "The fictionalized biography of legendary trader Jesse Livermore.",
  },
  {
    id: "the-new-market-wizards",
    title: "The New Market Wizards",
    author: "Jack D. Schwager",
    category: "Trading",
    description: "More conversations with top traders on discipline, risk, and edge.",
  },

  // Risk Management
  {
    id: "when-genius-failed",
    title: "When Genius Failed",
    author: "Roger Lowenstein",
    category: "Risk Management",
    description: "The rise and fall of Long-Term Capital Management and the dangers of leverage.",
  },
  {
    id: "the-black-swan",
    title: "The Black Swan",
    author: "Nassim Nicholas Taleb",
    category: "Risk Management",
    description: "The impact of highly improbable events on markets and life.",
  },
  {
    id: "antifragile",
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    category: "Risk Management",
    description: "How to build portfolios and systems that gain from disorder.",
  },

  // Macro & Economics
  {
    id: "the-big-short",
    title: "The Big Short",
    author: "Michael Lewis",
    category: "Macro",
    description: "Inside the doomsday machine — how a handful of investors bet against the housing bubble.",
  },
  {
    id: "liar-s-poker",
    title: "Liar's Poker",
    author: "Michael Lewis",
    category: "Macro",
    description: "Life on the bond trading desks of Salomon Brothers in the 1980s.",
  },
  {
    id: "the-alchemy-of-finance",
    title: "The Alchemy of Finance",
    author: "George Soros",
    category: "Macro",
    description: "Soros's theory of reflexivity and how it applies to global markets.",
  },
  {
    id: "principles-for-navigating-big-debt-crises",
    title: "Principles for Navigating Big Debt Crises",
    author: "Ray Dalio",
    category: "Macro",
    description: "Dalio's framework for understanding and surviving debt cycles.",
  },

  // Personal Finance
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Personal Finance",
    description: "Lessons on financial literacy, assets, and building wealth.",
  },
  {
    id: "the-millionaire-next-door",
    title: "The Millionaire Next Door",
    author: "Thomas J. Stanley",
    category: "Personal Finance",
    description: "Surprising secrets of America's wealthy based on research.",
  },
  {
    id: "i-will-teach-you-to-be-rich",
    title: "I Will Teach You to Be Rich",
    author: "Ramit Sethi",
    category: "Personal Finance",
    description: "A practical 6-week personal finance program for young adults.",
  },

  // Market Theory
  {
    id: "against-the-gods",
    title: "Against the Gods: The Remarkable Story of Risk",
    author: "Peter Bernstein",
    category: "Market Theory",
    description: "The history of risk and probability and their role in modern finance.",
  },
  {
    id: "capital-in-the-twenty-first-century",
    title: "Capital in the Twenty-First Century",
    author: "Thomas Piketty",
    category: "Market Theory",
    description: "The dynamics of capital accumulation and wealth inequality over centuries.",
  },
];

export const categories = [...new Set(books.map((b) => b.category))];
