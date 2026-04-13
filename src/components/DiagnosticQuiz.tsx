import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Shield, Maximize, Eye, EyeOff } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';
import { useAuth } from '@/contexts/AuthContext';
import { evaluateAnswerHybrid, type EvaluationResult } from '@/utils/hybridEvaluation';

interface DiagnosticQuizProps {
  course: string;
  contentType: 'video' | 'article' | 'both' | 'diagnostic';
  onQuizComplete: (level: string, score: number) => void;
}

// Quiz questions data (truncated for brevity - use your existing questions)
const topicQuestions: Record<string, any[]> = {
  html: [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
      correct: 0
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<hyperlink>"],
      correct: 1
    },
    {
      question: "What is the correct HTML element for the largest heading?",
      options: ["<h6>", "<heading>", "<h1>", "<head>"],
      correct: 2
    },
    {
      question: "Which attribute is used to specify an alternate text for an image?",
      options: ["src", "alt", "title", "href"],
      correct: 1
    },
    {
      question: "What is the purpose of the <!DOCTYPE html> declaration?",
      options: ["To define the document type", "To link CSS files", "To include JavaScript", "To set the character encoding"],
      correct: 0
    },
    {
      question: "Which tag is used to define an unordered list?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      correct: 1
    },
    {
      question: "What does the <br> tag do?",
      options: ["Creates a bold text", "Inserts a line break", "Creates a horizontal rule", "Defines a paragraph"],
      correct: 1
    },
    {
      question: "Which attribute is used to make a checkbox checked by default?",
      options: ["selected", "checked", "default", "active"],
      correct: 1
    },
    {
      question: "What is the correct way to comment in HTML?",
      options: ["// Comment", "<!-- Comment -->", "/* Comment */", "# Comment"],
      correct: 1
    },
    {
      question: "Which element is used for the largest heading in HTML5?",
      options: ["<h1>", "<heading>", "<head>", "<h6>"],
      correct: 0
    }
  ],
  css: [
    {
      question: "Which property is used to change the background color?",
      options: ["color", "bgcolor", "background-color", "background"],
      correct: 2
    },
    {
      question: "How do you make text bold in CSS?",
      options: ["font-weight: bold;", "text-style: bold;", "font: bold;", "weight: bold;"],
      correct: 0
    },
    {
      question: "Which property controls the space between elements?",
      options: ["spacing", "margin", "padding", "border"],
      correct: 1
    },
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
      correct: 2
    },
    {
      question: "How do you center an element horizontally?",
      options: ["text-align: center;", "align: center;", "margin: auto;", "center: true;"],
      correct: 2
    },
    {
      question: "Which property is used to change the text color?",
      options: ["text-color", "font-color", "color", "text-style"],
      correct: 2
    },
    {
      question: "What is the default display value for a <div> element?",
      options: ["inline", "block", "flex", "grid"],
      correct: 1
    },
    {
      question: "Which property is used to add rounded corners?",
      options: ["border-radius", "corner-radius", "round-corner", "border-round"],
      correct: 0
    },
    {
      question: "How do you apply multiple CSS classes to an element?",
      options: ["class='class1 class2'", "class='class1, class2'", "class='class1; class2'", "class='class1+class2'"],
      correct: 0
    },
    {
      question: "Which property controls the space inside an element?",
      options: ["margin", "spacing", "padding", "inner-space"],
      correct: 2
    }
  ],
  javascript: [
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      correct: 3
    },
    {
      question: "What is the result of '2' + 2 in JavaScript?",
      options: ["4", "22", "NaN", "Error"],
      correct: 1
    },
    {
      question: "Which method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correct: 0
    },
    {
      question: "What is the purpose of the 'this' keyword?",
      options: ["Refers to current object", "Refers to previous object", "Refers to parent object", "Refers to global object"],
      correct: 0
    },
    {
      question: "Which symbol is used for single-line comments?",
      options: ["//", "/*", "#", "--"],
      correct: 0
    },
    {
      question: "What is the output of console.log(typeof null)?",
      options: ["null", "undefined", "object", "number"],
      correct: 2
    },
    {
      question: "Which method converts JSON string to JavaScript object?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
      correct: 0
    },
    {
      question: "What is a closure in JavaScript?",
      options: ["A function with no parameters", "A function that returns another function", "A function with access to its outer scope", "A function that calls itself"],
      correct: 2
    },
    {
      question: "Which loop is best for iterating over object properties?",
      options: ["for loop", "while loop", "for...in loop", "do...while loop"],
      correct: 2
    },
    {
      question: "What does the === operator check?",
      options: ["Value equality", "Type equality", "Both value and type equality", "Reference equality"],
      correct: 2
    }
  ],
  react: [
    {
      question: "What is React?",
      options: ["A programming language", "A database", "A JavaScript library for building UIs", "A CSS framework"],
      correct: 2
    },
    {
      question: "Which hook is used for side effects?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1
    },
    {
      question: "What is JSX?",
      options: ["A new programming language", "A syntax extension for JavaScript", "A CSS preprocessor", "A database query language"],
      correct: 1
    },
    {
      question: "How do you pass data to a child component?",
      options: ["Using state", "Using props", "Using context", "Using refs"],
      correct: 1
    },
    {
      question: "What is the virtual DOM?",
      options: ["A real DOM element", "A lightweight copy of the real DOM", "A CSS concept", "A database object"],
      correct: 1
    },
    {
      question: "Which method is called after component renders?",
      options: ["componentDidMount", "componentWillMount", "componentRender", "componentUpdated"],
      correct: 0
    },
    {
      question: "What is the purpose of keys in React lists?",
      options: ["To improve performance", "To add styling", "To handle events", "To manage state"],
      correct: 0
    },
    {
      question: "Which hook is used to manage state in functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correct: 1
    },
    {
      question: "What is React Router used for?",
      options: ["State management", "Routing and navigation", "API calls", "Form handling"],
      correct: 1
    },
    {
      question: "How do you update state in React?",
      options: ["this.state = value", "setState()", "updateState()", "modifyState()"],
      correct: 1
    }
  ],
  python: [
    {
      question: "Which of the following is used to define a function in Python?",
      options: ["function", "def", "define", "func"],
      correct: 1
    },
    {
      question: "How do you create a list in Python?",
      options: ["list = ()", "list = []", "list = {}", "list = <>"],
      correct: 1
    },
    {
      question: "What is the output of print(2 ** 3)?",
      options: ["6", "8", "9", "5"],
      correct: 1
    },
    {
      question: "Which keyword is used for inheritance?",
      options: ["inherits", "extends", "super", "class"],
      correct: 2
    },
    {
      question: "How do you handle exceptions in Python?",
      options: ["try-catch", "try-except", "error-handle", "catch-error"],
      correct: 1
    },
    {
      question: "What is the output of 'hello'[1:4]?",
      options: ["hell", "ello", "ell", "hel"],
      correct: 2
    },
    {
      question: "Which method is used to add an item to a list?",
      options: ["append()", "add()", "insert()", "push()"],
      correct: 0
    },
    {
      question: "What does len() function do?",
      options: ["Converts to lowercase", "Returns length of an object", "Rounds a number", "Checks data type"],
      correct: 1
    },
    {
      question: "How do you open a file for reading?",
      options: ["open('file.txt', 'r')", "open('file.txt', 'read')", "open('file.txt', 'w')", "open('file.txt')"],
      correct: 0
    },
    {
      question: "What is PEP 8?",
      options: ["Python Enhancement Proposal for style guide", "A Python library", "A Python framework", "A Python version"],
      correct: 0
    }
  ],
  java: [
    {
      question: "What is the main method signature in Java?",
      options: [
        "public static void main(String[] args)",
        "public void main(String[] args)",
        "static void main(String[] args)",
        "public static main(String[] args)"
      ],
      correct: 0
    },
    {
      question: "Which keyword is used to create an object?",
      options: ["create", "new", "object", "instance"],
      correct: 1
    },
    {
      question: "What is inheritance in Java?",
      options: [
        "A way to hide data",
        "A mechanism where one class acquires properties of another",
        "A type of loop",
        "A method of sorting"
      ],
      correct: 1
    },
    {
      question: "Which collection maintains insertion order?",
      options: ["HashSet", "TreeSet", "ArrayList", "HashMap"],
      correct: 2
    },
    {
      question: "What is the size of int in Java?",
      options: ["16 bits", "32 bits", "64 bits", "Depends on platform"],
      correct: 1
    },
    {
      question: "What is method overloading?",
      options: [
        "Same method name with different parameters",
        "Same method name in different classes",
        "Method that loads classes",
        "Method that overrides parent class"
      ],
      correct: 0
    },
    {
      question: "Which keyword is used for method overriding?",
      options: ["override", "overload", "@Override", "implements"],
      correct: 2
    },
    {
      question: "What is the superclass of all classes in Java?",
      options: ["Object", "Class", "Main", "Super"],
      correct: 0
    },
    {
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for loop", "while loop", "do-while loop", "enhanced for loop"],
      correct: 2
    },
    {
      question: "What is an interface?",
      options: [
        "A class with only concrete methods",
        "A blueprint of a class with abstract methods",
        "A type of variable",
        "A collection of constants"
      ],
      correct: 1
    }
  ],
  dbms: [
    {
      question: "What does DBMS stand for?",
      options: ["Database Management System", "Data Basic Management System", "Digital Base Management System", "Database Manipulation System"],
      correct: 0
    },
    {
      question: "What is a primary key?",
      options: ["A key that can be null", "A key that uniquely identifies each record", "A foreign key in another table", "A key used for encryption"],
      correct: 1
    },
    {
      question: "What is normalization?",
      options: ["Process of organizing data to reduce redundancy", "Process of backing up data", "Process of encrypting data", "Process of deleting data"],
      correct: 0
    },
    {
      question: "Which normal form eliminates transitive dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 2
    },
    {
      question: "What is a foreign key?",
      options: ["A key that is always unique", "A key that references primary key of another table", "A key used for sorting", "A key that is never null"],
      correct: 1
    },
    {
      question: "What is ACID in database?",
      options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Analysis, Creation, Implementation, Design", "Auto, Create, Insert, Delete"],
      correct: 0
    },
    {
      question: "What is a view in SQL?",
      options: ["A physical table", "A virtual table based on result-set", "A type of index", "A stored procedure"],
      correct: 1
    },
    {
      question: "Which command is used to remove a table?",
      options: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE", "ERASE TABLE"],
      correct: 1
    },
    {
      question: "What is a transaction?",
      options: ["A single SQL statement", "A sequence of database operations", "A database backup", "A table relationship"],
      correct: 1
    },
    {
      question: "What is the purpose of an index?",
      options: ["To store data permanently", "To improve query performance", "To enforce data integrity", "To create backups"],
      correct: 1
    }
  ],
  sql: [
    {
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
      correct: 0
    },
    {
      question: "Which clause is used to filter records?",
      options: ["FILTER BY", "WHERE", "HAVING", "CONDITION"],
      correct: 1
    },
    {
      question: "Which function returns the number of rows?",
      options: ["COUNT()", "SUM()", "TOTAL()", "NUMBER()"],
      correct: 0
    },
    {
      question: "What is the purpose of GROUP BY clause?",
      options: ["To sort records", "To group rows with same values", "To filter groups", "To join tables"],
      correct: 1
    },
    {
      question: "Which join returns all records when there is a match in either table?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      correct: 3
    },
    {
      question: "What is the difference between DELETE and TRUNCATE?",
      options: ["DELETE is faster", "TRUNCATE can be rolled back", "DELETE can have WHERE clause", "TRUNCATE is a DML command"],
      correct: 2
    },
    {
      question: "Which constraint ensures all values in a column are unique?",
      options: ["PRIMARY KEY", "UNIQUE", "NOT NULL", "CHECK"],
      correct: 1
    },
    {
      question: "What does the HAVING clause do?",
      options: ["Filters rows before grouping", "Filters groups after grouping", "Sorts the result set", "Joins multiple tables"],
      correct: 1
    },
    {
      question: "Which operator is used for pattern matching?",
      options: ["LIKE", "MATCH", "SIMILAR", "CONTAINS"],
      correct: 0
    },
    {
      question: "What is a subquery?",
      options: ["A query within another query", "A backup query", "A query that runs automatically", "A query for system tables"],
      correct: 0
    }
  ],
  c: [
    {
      question: "What is the entry point of a C program?",
      options: ["start()", "main()", "begin()", "program()"],
      correct: 1
    },
    {
      question: "Which operator is used to get the address of a variable?",
      options: ["*", "&", "#", "@"],
      correct: 1
    },
    {
      question: "What is the size of int in C?",
      options: ["8 bits", "16 bits", "32 bits", "Depends on compiler"],
      correct: 3
    },
    {
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "if-else"],
      correct: 2
    },
    {
      question: "What does the malloc() function do?",
      options: ["Frees memory", "Allocates memory", "Modifies memory", "Checks memory"],
      correct: 1
    },
    {
      question: "What is a pointer?",
      options: ["A variable that stores address", "A variable that stores value", "A function", "A data type"],
      correct: 0
    },
    {
      question: "Which header file is used for input/output?",
      options: ["<input.h>", "<stdio.h>", "<stdlib.h>", "<io.h>"],
      correct: 1
    },
    {
      question: "What is the purpose of break statement?",
      options: ["To exit a loop", "To skip current iteration", "To continue to next iteration", "To stop the program"],
      correct: 0
    },
    {
      question: "Which operator has highest precedence?",
      options: ["+", "*", "()", "="],
      correct: 2
    },
    {
      question: "What is recursion?",
      options: ["A function calling itself", "A type of loop", "A memory allocation technique", "A data structure"],
      correct: 0
    }
  ],
  cpp: [
    {
      question: "What is C++?",
      options: ["A pure object-oriented language", "An extension of C with OOP features", "A scripting language", "A markup language"],
      correct: 1
    },
    {
      question: "Which operator is used for dynamic memory allocation?",
      options: ["malloc", "new", "alloc", "create"],
      correct: 1
    },
    {
      question: "What is function overloading?",
      options: ["Same function name with different parameters", "Functions with same name in different classes", "Functions that are overloaded with work", "Functions that return different types"],
      correct: 0
    },
    {
      question: "What is a constructor?",
      options: ["A function that destroys objects", "A function that initializes objects", "A special variable", "A type of loop"],
      correct: 1
    },
    {
      question: "Which access specifier allows access from anywhere?",
      options: ["private", "protected", "public", "internal"],
      correct: 2
    },
    {
      question: "What is inheritance?",
      options: ["Creating new objects", "Deriving a class from another class", "Hiding data", "Overloading functions"],
      correct: 1
    },
    {
      question: "What is polymorphism?",
      options: ["Same function behaving differently", "Multiple inheritance", "Data hiding", "Memory management"],
      correct: 0
    },
    {
      question: "Which STL container uses LIFO?",
      options: ["vector", "list", "stack", "queue"],
      correct: 2
    },
    {
      question: "What is a virtual function?",
      options: ["A function that doesn't exist", "A function that can be overridden", "A static function", "A private function"],
      correct: 1
    },
    {
      question: "What is the 'this' pointer?",
      options: ["Pointer to current object", "Pointer to parent object", "Pointer to base class", "Pointer to derived class"],
      correct: 0
    }
  ],
  mongodb: [
    {
      question: "What is MongoDB?",
      options: ["A relational database", "A NoSQL document database", "A graph database", "A key-value store"],
      correct: 1
    },
    {
      question: "What is a document in MongoDB?",
      options: ["A JSON file", "A BSON document", "A XML file", "A CSV file"],
      correct: 1
    },
    {
      question: "Which command is used to create a database?",
      options: ["CREATE DATABASE", "USE DATABASE", "NEW DATABASE", "MongoDB creates automatically when you use it"],
      correct: 3
    },
    {
      question: "What is _id in MongoDB?",
      options: ["A required field that must be unique", "An optional field", "A field for indexing only", "A field for sorting"],
      correct: 0
    },
    {
      question: "Which operator is used for equality check?",
      options: ["$eq", "$equal", "$match", "$is"],
      correct: 0
    },
    {
      question: "What is aggregation in MongoDB?",
      options: ["Process of combining documents", "Process of deleting documents", "Process of backing up data", "Process of sharding"],
      correct: 0
    },
    {
      question: "Which method is used to insert documents?",
      options: ["insert()", "add()", "create()", "put()"],
      correct: 0
    },
    {
      question: "What is sharding?",
      options: ["Partitioning data across multiple servers", "Backing up data", "Encrypting data", "Compressing data"],
      correct: 0
    },
    {
      question: "Which operator is used for greater than comparison?",
      options: ["$gt", "$greater", "$more", "$bigger"],
      correct: 0
    },
    {
      question: "What is a replica set?",
      options: ["A set of identical databases", "A group of MongoDB servers that maintain same data", "A collection of documents", "A type of index"],
      correct: 1
    }
  ],
  nodejs: [
    {
      question: "What is Node.js?",
      options: ["A JavaScript framework", "A JavaScript runtime built on Chrome's V8", "A database", "A programming language"],
      correct: 1
    },
    {
      question: "What is the purpose of package.json?",
      options: ["To store node modules", "To manage dependencies and scripts", "To compile JavaScript", "To run the server"],
      correct: 1
    },
    {
      question: "Which module is used to create web servers?",
      options: ["http", "web", "server", "express"],
      correct: 0
    },
    {
      question: "What is npm?",
      options: ["Node Package Manager", "New Project Manager", "Node Project Module", "Network Package Manager"],
      correct: 0
    },
    {
      question: "What is callback hell?",
      options: ["Too many nested callbacks", "Callbacks that never execute", "Synchronous callbacks", "Blocking callbacks"],
      correct: 0
    },
    {
      question: "What is the Event Loop?",
      options: ["A loop that handles asynchronous operations", "A type of for loop", "A debugging tool", "A performance monitor"],
      correct: 0
    },
    {
      question: "Which method is used to read environment variables?",
      options: ["process.env", "environment.get", "sys.env", "config.env"],
      correct: 0
    },
    {
      question: "What is middleware in Express.js?",
      options: ["Functions that execute during request lifecycle", "Database middleware", "Template engines", "Authentication systems"],
      correct: 0
    },
    {
      question: "What does require() do?",
      options: ["Imports modules", "Exports modules", "Requires user input", "Checks conditions"],
      correct: 0
    },
    {
      question: "What is the purpose of module.exports?",
      options: ["To import modules", "To export functions/variables from a module", "To delete modules", "To update modules"],
      correct: 1
    }
  ],
  ai: [
    {
      question: "What does AI stand for?",
      options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Intelligence", "Automatic Information"],
      correct: 1
    },
    {
      question: "What is machine learning?",
      options: ["AI that can learn without data", "AI that requires explicit programming", "AI that learns from data", "AI that only follows rules"],
      correct: 2
    },
    {
      question: "What is neural network?",
      options: ["A database system", "A computer network", "A computing system inspired by human brain", "A type of algorithm"],
      correct: 2
    },
    {
      question: "What is supervised learning?",
      options: ["Learning without labels", "Learning with labeled data", "Learning from rewards", "Learning from unlabeled data"],
      correct: 1
    },
    {
      question: "What is the Turing Test?",
      options: ["A test for computer speed", "A test for AI intelligence", "A programming test", "A hardware test"],
      correct: 1
    },
    {
      question: "What is natural language processing?",
      options: ["AI that understands human language", "AI that processes numbers", "AI for image recognition", "AI for robotics"],
      correct: 0
    },
    {
      question: "What is deep learning?",
      options: ["Learning with deep concentration", "Neural networks with multiple layers", "Learning complex algorithms", "Advanced programming"],
      correct: 1
    },
    {
      question: "What is reinforcement learning?",
      options: ["Learning from labeled data", "Learning from rewards and punishments", "Learning from unlabeled data", "Learning from examples"],
      correct: 1
    },
    {
      question: "What is computer vision?",
      options: ["AI that can see and understand images", "AI for text processing", "AI for speech recognition", "AI for data analysis"],
      correct: 0
    },
    {
      question: "What is an algorithm in AI?",
      options: ["A set of rules to solve problems", "A programming language", "A type of data", "A computer component"],
      correct: 0
    }
  ],
  ml: [
    {
      question: "What is the difference between AI and ML?",
      options: ["ML is subset of AI", "AI is subset of ML", "They are the same", "ML is for robots only"],
      correct: 0
    },
    {
      question: "What is regression in ML?",
      options: ["Predicting continuous values", "Classifying categories", "Grouping similar items", "Finding patterns"],
      correct: 0
    },
    {
      question: "What is classification?",
      options: ["Predicting categories", "Predicting numbers", "Finding clusters", "Reducing dimensions"],
      correct: 0
    },
    {
      question: "What is overfitting?",
      options: ["Model performs well on training data but poorly on new data", "Model performs poorly on all data", "Model is too simple", "Model trains too slowly"],
      correct: 0
    },
    {
      question: "What is training data?",
      options: ["Data used to train the model", "Data used to test the model", "Data for validation", "Data for deployment"],
      correct: 0
    },
    {
      question: "What is feature engineering?",
      options: ["Creating new features from existing data", "Building ML models", "Testing models", "Deploying models"],
      correct: 0
    },
    {
      question: "What is cross-validation?",
      options: ["Technique to assess model performance", "A type of neural network", "A feature selection method", "A data cleaning technique"],
      correct: 0
    },
    {
      question: "What is clustering?",
      options: ["Grouping similar data points", "Predicting values", "Classifying data", "Reducing noise"],
      correct: 0
    },
    {
      question: "What is a decision tree?",
      options: ["A tree-like model for decisions", "A type of forest", "A database structure", "A programming concept"],
      correct: 0
    },
    {
      question: "What is gradient descent?",
      options: ["Optimization algorithm", "Data visualization technique", "Model evaluation method", "Feature selection approach"],
      correct: 0
    }
  ],
  cn: [
    {
      question: "What does CN stand for in computing?",
      options: ["Computer Networks", "Central Node", "Computer Nodes", "Connected Network"],
      correct: 0
    },
    {
      question: "What is IP address?",
      options: ["Internet Protocol address", "Internet Password", "Internal Program", "International Protocol"],
      correct: 0
    },
    {
      question: "What is TCP?",
      options: ["Transmission Control Protocol", "Total Control Protocol", "Transfer Communication Protocol", "Technical Control Process"],
      correct: 0
    },
    {
      question: "What is DNS?",
      options: ["Domain Name System", "Data Network Service", "Digital Naming System", "Domain Network Service"],
      correct: 0
    },
    {
      question: "What is HTTP?",
      options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Protocol", "High Text Transfer Protocol"],
      correct: 0
    },
    {
      question: "What is a router?",
      options: ["Device that connects networks", "Device that connects computers", "Wireless access point", "Network switch"],
      correct: 0
    },
    {
      question: "What is bandwidth?",
      options: ["Maximum data transfer rate", "Network speed", "Internet cost", "Data storage capacity"],
      correct: 0
    },
    {
      question: "What is latency?",
      options: ["Time delay in network", "Network speed", "Data size", "Connection type"],
      correct: 0
    },
    {
      question: "What is VPN?",
      options: ["Virtual Private Network", "Visual Private Network", "Virtual Public Network", "Visual Public Network"],
      correct: 0
    },
    {
      question: "What is firewall?",
      options: ["Network security system", "Network speed booster", "Internet provider", "Wireless router"],
      correct: 0
    }
  ],
  os: [
    {
      question: "What does OS stand for?",
      options: ["Operating System", "Operation Software", "Organized System", "Operating Software"],
      correct: 0
    },
    {
      question: "What is kernel?",
      options: ["Core of operating system", "User interface", "Application software", "Hardware component"],
      correct: 0
    },
    {
      question: "What is process?",
      options: ["Program in execution", "Completed program", "Hardware device", "User interface"],
      correct: 0
    },
    {
      question: "What is virtual memory?",
      options: ["Memory management technique", "Physical RAM", "Hard disk space", "CPU cache"],
      correct: 0
    },
    {
      question: "What is deadlock?",
      options: ["When processes wait for each other indefinitely", "System crash", "Memory leak", "Software bug"],
      correct: 0
    },
    {
      question: "What is scheduling?",
      options: ["Process management", "Memory allocation", "File management", "Device management"],
      correct: 0
    },
    {
      question: "What is multiprogramming?",
      options: ["Multiple programs in memory", "Single program running", "Multiple CPUs", "Network programming"],
      correct: 0
    },
    {
      question: "What is paging?",
      options: ["Memory management scheme", "File organization", "Process creation", "Device driver"],
      correct: 0
    },
    {
      question: "What is system call?",
      options: ["Interface between process and OS", "Function call", "Hardware interrupt", "Software update"],
      correct: 0
    },
    {
      question: "What is thrashing?",
      options: ["Excessive paging", "Fast processing", "Memory allocation", "Disk fragmentation"],
      correct: 0
    }
  ],
  default: [
    {
      question: "What is the purpose of this topic?",
      options: ["To learn programming", "To understand concepts", "To build applications", "All of the above"],
      correct: 3
    }
  ]
};

const openEndedQuestions: Record<string, string[]> = {
  html: [
    "Explain the difference between <div> and <span> elements.",
    "What are semantic HTML elements and why are they important?",
    "How does the browser render an HTML page?",

  ],
  css: [
    "Explain the CSS box model and its components.",
    "What is the difference between display: none and visibility: hidden?",
    "How does CSS specificity work?",

  ],
  javascript: [
    "Explain the difference between let, const, and var.",
    "What are closures and how are they useful?",
    "Describe the event loop in JavaScript.",

  ],
  react: [
    "Explain the difference between state and props.",
    "What are React hooks and why were they introduced?",
    "How does React's virtual DOM improve performance?",

  ],
  python: [
    "Explain the difference between lists and tuples.",
    "What are decorators and how do you use them?",
    "How does Python handle memory management?",

  ],
  java: [
    "Explain the difference between abstract classes and interfaces.",
    "What is the Java Virtual Machine (JVM) and how does it work?",
    "Describe garbage collection in Java.",

  ],
  dbms: [
    "Explain the different normal forms in database design.",
    "What are ACID properties and why are they important?",
    "What is database normalization and denormalization?",

  ],
  sql: [
    "Explain the difference between INNER JOIN and LEFT JOIN.",
    "What are subqueries and when would you use them?",
    "Describe SQL transactions and their properties.",

  ],
  c: [
    "Explain pointers and their use in C programming.",
    "What are structures and unions in C?",
    "Describe dynamic memory allocation in C.",

  ],
  cpp: [
    "Explain object-oriented programming concepts in C++.",
    "What are templates in C++ and how do they work?",
    "Describe exception handling in C++.",

  ],
  mongodb: [
    "Explain the difference between SQL and NoSQL databases.",
    "What are MongoDB aggregation pipelines?",
    "Describe MongoDB indexing strategies.",

  ],
  nodejs: [
    "Explain the Node.js event-driven architecture.",
    "What is the difference between callbacks, promises, and async/await?",
    "Describe middleware in Express.js.",

  ],
  ai: [
    "Explain the difference between strong AI and weak AI.",
    "What are the main branches of artificial intelligence?",
    "Describe the Turing Test and its significance.",

  ],
  ml: [
    "What are the main types of machine learning?",
    "Describe the process of training a machine learning model.",
    "What is cross-validation and why is it important?",

  ],
  cn: [

    "What is TCP/IP protocol suite?",
    "What are the differences between TCP and UDP?",
    "What is subnetting and why is it used?",

  ],
  os: [

    "What is virtual memory and how does it work?",
    "Describe deadlock prevention and avoidance techniques.",
    "What are different types of operating systems?",

  ],
  default: [
    "What do you hope to achieve by learning this topic?",
    "Describe any previous experience you have with this topic.",
    "What specific areas of this topic interest you most?",
    "How do you plan to apply this knowledge in real-world projects?",
    "What challenges do you anticipate while learning this topic?",
    "Describe your learning strategy for this topic.",
    "What resources do you find most helpful for learning this subject?"
  ]
};

const DiagnosticQuiz = ({ course, contentType, onQuizComplete }: DiagnosticQuizProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveQuizResult } = useLearning();
  const { user } = useAuth();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<number[]>([]);
  const [openEndedAnswers, setOpenEndedAnswers] = useState<string[]>([]);
  const [showOpenEnded, setShowOpenEnded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<{ level: string; score: number } | null>(null);
  const [violationCount, setViolationCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  // Get questions for the current course
  const courseQuestions = topicQuestions[course.toLowerCase()] || topicQuestions.default;
  const courseOpenEnded = openEndedQuestions[course.toLowerCase()] || openEndedQuestions.default;

  // Initialize answer arrays
  useEffect(() => {
    setMcqAnswers(Array(courseQuestions.length).fill(-1));
    setOpenEndedAnswers(Array(courseOpenEnded.length).fill(''));
    textareaRefs.current = Array(courseOpenEnded.length).fill(null);
  }, [course, courseQuestions.length, courseOpenEnded.length]);

  // Enhanced state tracking for quiz completion
  useEffect(() => {
    console.log('🎯 Quiz Completion State:', {
      quizCompleted,
      quizResults,
      hasResults: !!quizResults,
      shouldShowResults: quizCompleted && quizResults
    });
    
    if (quizCompleted && quizResults) {
      console.log('🚀 READY TO NAVIGATE TO QUIZ RESULTS!', quizResults);
      // Navigate to quiz results page instead of rendering QuizResults component directly
      navigate('/quiz-results', { 
        state: {
          score: quizResults.score,
          level: quizResults.level,
          course: course
        }
      });
    }
  }, [quizCompleted, quizResults, navigate, course]);

  // Proctoring setup
  useEffect(() => {
    if (quizStarted && !quizCompleted) {
      console.log('🛡️ Proctoring started');
      
      const handleVisibilityChange = () => {
        if (document.hidden) {
          handleViolation('Switching tabs or applications is not allowed during the quiz.');
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [quizStarted, quizCompleted, toast]);

  const handleViolation = (message: string) => {
    const newCount = violationCount + 1;
    setViolationCount(newCount);

    toast({
      title: `Proctoring Violation (${newCount}/3)`,
      description: message,
      variant: "destructive",
      duration: 3000,
    });

    if (newCount >= 3) {
      toast({
        title: "Quiz Terminated",
        description: "Too many proctoring violations. The quiz has been terminated.",
        variant: "destructive",
        duration: 5000,
      });
      
      setQuizStarted(false);
      setViolationCount(0);
      
      setTimeout(() => {
        navigate('/courses');
      }, 3000);
    }
  };

  const startQuiz = () => {
    console.log('🚀 Starting quiz for course:', course);
    setQuizStarted(true);
    setViolationCount(0);
  };

  const handleMcqAnswer = (answer: number) => {
    const newAnswers = [...mcqAnswers];
    newAnswers[currentQuestion] = answer;
    setMcqAnswers(newAnswers);
  };

  const handleOpenEndedAnswer = (index: number, value: string) => {
    const newAnswers = [...openEndedAnswers];
    newAnswers[index] = value;
    setOpenEndedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < courseQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('📝 Moving to open-ended questions');
      setShowOpenEnded(true);
    }
  };

  const previousQuestion = () => {
    if (showOpenEnded) {
      setShowOpenEnded(false);
      setCurrentQuestion(courseQuestions.length - 1);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    console.log('📤 Submitting quiz...');
    setIsSubmitting(true);

    try {
      // Calculate MCQ score
      const mcqScore = mcqAnswers.reduce((score, answer, index) => {
        return score + (answer === courseQuestions[index].correct ? 1 : 0);
      }, 0);

      console.log('📊 MCQ Score:', mcqScore, 'out of', courseQuestions.length);

      // Evaluate open-ended answers
      let openEndedScore = 0;
      const openEndedEvaluations: EvaluationResult[] = [];

      openEndedAnswers.forEach((answer, index) => {
        const evaluation = evaluateAnswerHybrid(index, course.toLowerCase(), answer);
        openEndedEvaluations.push(evaluation);
        openEndedScore += evaluation.score;
      });

      const averageOpenEndedScore = openEndedEvaluations.length > 0
        ? openEndedScore / openEndedEvaluations.length
        : 0;

      console.log('📝 Open-ended average score:', averageOpenEndedScore);

      // Combined score (70% MCQ + 30% Open-ended)
      const combinedScore = (mcqScore / courseQuestions.length) * 0.7 + averageOpenEndedScore * 0.3;
      const finalScore = Math.round(combinedScore * 100);

      console.log('🎯 Combined score:', finalScore);

      // Determine skill level
      let skillLevel: 'beginner' | 'intermediate' | 'advanced';
      if (combinedScore <= 0.4) skillLevel = 'beginner';
      else if (combinedScore <= 0.7) skillLevel = 'intermediate';
      else skillLevel = 'advanced';

      console.log('🏆 Determined skill level:', skillLevel);

      // Create results object
      const results = {
        level: skillLevel,
        score: finalScore
      };

      console.log('✅ Setting quiz results and marking as completed', results);
      
      // Set results and mark as completed - this will trigger the navigation
      setQuizResults(results);
      setQuizCompleted(true);

      // Save results
      if (user) {
        console.log('💾 Saving quiz results for user');
        saveQuizResult({
          courseId: course,
          score: finalScore,
          level: skillLevel,
          completedAt: new Date(),
          openEndedEvaluations
        });
      }

      // Call the completion callback
      console.log('📞 Calling onQuizComplete prop');
      onQuizComplete(skillLevel, finalScore);

    } catch (error) {
      console.error('❌ Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Submit quiz process completed');
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="max-w-2xl w-full p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="relative">
              <Shield className="w-16 h-16 mx-auto text-blue-800" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                !
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Proctored Diagnostic Quiz</h1>
            <p className="text-gray-600">
              This quiz will help us understand your current skill level in {course} and create a personalized learning path.
            </p>
          </div>

          <div className="space-y-4 bg-red-50 border border-red-200 p-6 rounded-lg">
            <h2 className="font-semibold flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              Strict Proctoring Rules
            </h2>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                <span>• Copy, paste, and cut operations are completely disabled</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>• Right-click context menu is blocked</span>
              </li>
              <li className="flex items-center gap-2">
                <Maximize className="w-4 h-4" />
                <span>• Fullscreen mode will be enforced</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>• Tab switching or minimizing the browser is prohibited</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold">⚠️</span>
                <span>• <strong>3 violations will result in automatic quiz termination</strong></span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-semibold">Quiz Format:</p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• {courseQuestions.length} Multiple Choice Questions</li>
              <li>• {courseOpenEnded.length} Open-Ended Questions</li>
              <li>• Estimated time: 15-20 minutes</li>
              <li>• Your results will help personalize your learning experience</li>
            </ul>
          </div>

          <Button onClick={startQuiz} className="w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
            <Shield className="w-4 h-4 mr-2" />
            Start Proctored Quiz
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-900 to-gray-800 relative">
      {/* Proctoring Status Bar */}
      <div className="absolute top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>PROCTORED ASSESSMENT - DO NOT SWITCH TABS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Violations: {violationCount}/3</span>
          {isFullscreen && <Eye className="w-4 h-4" />}
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 py-16">
        {/* Header */}
        <div className="flex items-center justify-between pt-8">
          <div>
            <h1 className="text-2xl font-bold text-white">{course} Diagnostic Quiz</h1>
            <p className="text-sm text-gray-300">
              {showOpenEnded ? 'Open-Ended Questions' : `Question ${currentQuestion + 1} of ${courseQuestions.length}`}
            </p>
          </div>
          <div className="text-sm text-red-400 flex items-center gap-1">
            <Shield className="w-4 h-4" /> Proctored Assessment
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-300"
            style={{
              width: `${showOpenEnded ? 100 : ((currentQuestion + 1) / courseQuestions.length) * 100}%`
            }}
          />
        </div>

        {/* Questions */}
        <Card className="p-8 bg-white border-red-200">
          {!showOpenEnded ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {courseQuestions[currentQuestion].question}
              </h2>
              <RadioGroup
                value={mcqAnswers[currentQuestion]?.toString()}
                onValueChange={(value) => handleMcqAnswer(parseInt(value))}
              >
                {courseQuestions[currentQuestion].options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-200">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-700">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="space-y-8">
              {courseOpenEnded.map((question, index) => (
                <div key={index} className="space-y-3">
                  <Label className="text-base font-semibold text-gray-900">
                    {index + 1}. {question}
                  </Label>
                  <Textarea
                    ref={(el) => textareaRefs.current[index] = el}
                    value={openEndedAnswers[index]}
                    onChange={(e) => handleOpenEndedAnswer(index, e.target.value)}
                    placeholder="Type your answer here... (Copy-paste is disabled)"
                    rows={4}
                    className="resize-none border-gray-300 focus:border-red-500 bg-gray-50"
                  />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0 && !showOpenEnded}
            className="border-gray-300 text-gray-700"
          >
            Previous
          </Button>
          {!showOpenEnded ? (
            <Button
              onClick={nextQuestion}
              disabled={mcqAnswers[currentQuestion] === -1}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {currentQuestion === courseQuestions.length - 1 ? 'Continue to Open-Ended' : 'Next'}
            </Button>
          ) : (
            <Button
              onClick={submitQuiz}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticQuiz;