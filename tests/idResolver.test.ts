import getIds from '../src/IdResolver';

describe('Test Helper', () => {
  test('Test getIds from value', () => {
    expect(getIds(1, null, undefined)).toBe(1);
    expect(getIds([1, 2], null, undefined)).toMatchObject([1, 2]);
  });

  test('Test getIds from props', () => {
    expect(getIds(() => 1, null, undefined)).toBe(1);
    expect(getIds((p: any) => p.id, { id: [1, 2] }, undefined)).toMatchObject([
      1,
      2
    ]);
  });

  test('Test getIds from state', () => {
    expect(
      getIds(
        (_p, s: any) => s.data.id,
        { id: [1, 2] },
        { data: { id: [2, 3] } }
      )
    ).toMatchObject([2, 3]);
  });
});
