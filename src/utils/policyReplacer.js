export function replaceWithCustomPolicy(policies, policy) {
  const filteredToRemovePages = policies.filter((p) =>
    p[0].includes("layout.policy")
  );
  policies = [
    ...filteredToRemovePages,
    [
      policy.name,
      async () => {
        return { default: policy };
      },
    ],
  ];

  return policies;
}
