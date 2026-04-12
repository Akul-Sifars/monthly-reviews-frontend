import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  toggleQuestion,
} from "../../api/questions.api";
import { useAuth } from "../../context/AuthContext";
import type { Question } from "../../types";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Link } from "@tanstack/react-router";

export const ManageQuestions: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  // Query to fetch all questions
  const { data: questions, isLoading } = useQuery({
    queryKey: ["allQuestions"],
    queryFn: () => getAllQuestions(),
  });

  // Mutation to create a question
  const createMutation = useMutation({
    mutationFn: (questionText: string) => createQuestion(questionText),
    onSuccess: () => {
      setNewQuestionText("");
      setShowAddForm(false);
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
    },
    onError: () => {
      setError("Failed to create question");
    },
  });

  // Mutation to update a question
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      text,
      isActive,
    }: {
      id: number;
      text: string;
      isActive?: boolean;
    }) => updateQuestion(id, text, isActive),
    onSuccess: () => {
      setEditingQuestion(null);
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
    },
    onError: () => {
      setError("Failed to update question");
    },
  });

  // Mutation to delete a question
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
    },
    onError: () => {
      setError("Failed to delete question");
    },
  });

  // Mutation to toggle question active status
  const toggleMutation = useMutation({
    mutationFn: (id: number) => toggleQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
    },
    onError: () => {
      setError("Failed to toggle question");
    },
  });

  const handleCreateQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    createMutation.mutate(newQuestionText);
  };

  const handleUpdateQuestion = () => {
    if (!editingQuestion || !editingQuestion.question_text.trim()) return;
    updateMutation.mutate({
      id: editingQuestion.id,
      text: editingQuestion.question_text,
      isActive: editingQuestion.is_active,
    });
  };

  const handleDeleteQuestion = (id: number) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    deleteMutation.mutate(id);
  };

  const handleToggleActive = (id: number) => {
    toggleMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-blue-600 hover:text-blue-800">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Questions
            </h1>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Add Question Button */}
        <div className="mb-6">
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto"
            >
              + Add New Question
            </Button>
          ) : (
            <Card className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Create New Question
              </h3>
              <form onSubmit={handleCreateQuestion}>
                <Input
                  label="Question Text"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Enter your question..."
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Creating..." : "Create"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewQuestionText("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>

        {/* Questions List */}
        {isLoading ? (
          <div className="text-center py-12">
            <LoadingSpinner message="Loading questions..." />
          </div>
        ) : !questions || questions.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 py-8">
              No questions found. Create your first question!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <Card key={question.id}>
                {editingQuestion?.id === question.id ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Edit Question
                    </h3>
                    <div className="space-y-4">
                      <Input
                        label="Question Text"
                        value={editingQuestion.question_text}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            question_text: e.target.value,
                          })
                        }
                        required
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleUpdateQuestion}
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingQuestion(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-lg text-gray-900 mb-2">
                        {question.question_text}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            question.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {question.is_active ? "Active" : "Inactive"}
                        </span>
                        <span className="text-sm text-gray-500">
                          Created: {question.created_at}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleToggleActive(question.id)}
                        disabled={toggleMutation.isPending}
                      >
                        {question.is_active ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingQuestion(question)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
