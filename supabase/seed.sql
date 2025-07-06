-- Seed data for webhooks table (development only)
INSERT INTO public.webhooks (github_id, event_type, repository, sender, payload, headers) VALUES
(
    'test-delivery-1',
    'push',
    'austenstone/test-repo',
    'austenstone',
    '{"ref": "refs/heads/main", "commits": [{"message": "Initial commit", "author": {"name": "Austen Stone"}}]}',
    '{"x-github-event": "push", "x-github-delivery": "test-delivery-1"}'
),
(
    'test-delivery-2',
    'pull_request',
    'austenstone/test-repo',
    'austenstone',
    '{"action": "opened", "pull_request": {"title": "Add new feature", "number": 1}}',
    '{"x-github-event": "pull_request", "x-github-delivery": "test-delivery-2"}'
),
(
    'test-delivery-3',
    'issues',
    'austenstone/test-repo',
    'austenstone',
    '{"action": "opened", "issue": {"title": "Bug report", "number": 5}}',
    '{"x-github-event": "issues", "x-github-delivery": "test-delivery-3"}'
);
