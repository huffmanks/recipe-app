export default function ProfileSettingsPage() {
  return (
    <>
      <ul className="list-decimal">
        <li>Radio options for preferred theme (light, dark, system)</li>
        <li>
          Unit of Measurement: Radio options to set the default unit system for recipes (Metric, US
          Customary).
        </li>
        <li>
          Default Servings Size: An input field to set the default serving size when adding or
          viewing recipes.
        </li>
        <li>
          Privacy Settings: Options to control who can view your recipes. (i.e. visibility: public
          or private (family only)).
        </li>
      </ul>
    </>
  );
}
