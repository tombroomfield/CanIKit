export function replaceWithCustomPolicy(policies: any, policy: any) {
  const filteredToRemovePages = policies.filter((p: any) =>
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
