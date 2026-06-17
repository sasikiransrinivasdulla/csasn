/* chapters_2.js — Chapters 9-16 */
const CHAPTERS_2 = [

{
  id:'ch-09', number:'09',
  title:'Flow Designer vs Notification',
  tags:['Flow Designer','Notification','Automation'],
  content:`
<p class="chapter-intro">Flow Designer = visual no-code automation builder. Notifications = email/SMS triggered by events or conditions.</p>
<h3>Flow Designer</h3>
<ul>
  <li>Replaced classic Workflow for most use cases.</li>
  <li>Uses <strong>Triggers</strong> → <strong>Conditions</strong> → <strong>Actions</strong> / <strong>Flow Logic</strong>.</li>
  <li>Trigger types: <strong>Record-based</strong> (created/updated), <strong>Schedule</strong>, <strong>Application</strong>, <strong>Inbound Email</strong>.</li>
  <li>Actions: Create Record, Update Record, Ask for Approval, Send Notification, Run Script.</li>
  <li>Subflows — Reusable flow components called from other flows.</li>
  <li>Actions — Reusable single-step components (like functions).</li>
  <li>Runs on <strong>server side</strong>.</li>
</ul>
<h3>Notifications</h3>
<ul>
  <li>Send <strong>Email / SMS / Push</strong> when conditions are met.</li>
  <li>Triggered by: <strong>Events</strong>, <strong>Record insert/update</strong>, or called from Flow Designer.</li>
  <li>Template uses <strong>variables</strong> like <code>&#36;{incident.number}</code>.</li>
  <li>Can be sent to: Users, Groups, email addresses.</li>
  <li>Stored in <span class="kw">sysevent_email_action</span> table.</li>
  <li><strong>Notification Preference</strong> — Users can opt out of certain notifications.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Flow Designer = "Do things automatically." Trigger → Action chain.</li>
      <li>Notification = "Tell someone something." Email/SMS/Push.</li>
      <li>Subflow = Reusable mini-flow. Action = Reusable single step.</li>
      <li>Notification inside Flow → use "Send Notification" action.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Flow Designer replaces Business Rules" — <strong>FALSE</strong>. Business Rules still exist and serve different purposes (low-level server scripting).</li>
      <li>"Notifications always require an event" — <strong>FALSE</strong>. Can also trigger on record insert/update directly.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-10', number:'10',
  title:'Update Sets',
  tags:['Update Sets','Migration','Dev to Prod'],
  content:`
<p class="chapter-intro">Update Sets = Packages of configuration changes. Move customizations safely from Dev → Test → Production.</p>
<h3>Core Concepts</h3>
<ul>
  <li>All configuration changes in an instance are captured in the <strong>current Update Set</strong>.</li>
  <li>Default Update Set: <span class="kw">Default</span>. Always exists. Cannot be deleted.</li>
  <li>Update Set state: <strong>In Progress → Complete → Retrieved → Preview → Commit</strong>.</li>
  <li>Only <strong>configuration</strong> changes are captured — NOT data changes (e.g., inserting a record in Incident table).</li>
</ul>
<h3>Migration Process</h3>
<ol>
  <li>Mark Update Set as <strong>Complete</strong> on source instance.</li>
  <li><strong>Export</strong> as XML file.</li>
  <li><strong>Import</strong> XML on target instance.</li>
  <li>Run <strong>Preview</strong> — checks for conflicts.</li>
  <li><strong>Commit</strong> — applies changes.</li>
</ol>
<h3>Conflicts</h3>
<ul>
  <li>Preview shows potential conflicts (e.g., same record modified in both instances).</li>
  <li>Can accept remote version or skip individual updates.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Update Set = Config backpack. Pack in Dev, unpack in Prod.</li>
      <li>Complete → Export → Import → Preview → Commit. This is the exact flow.</li>
      <li>Data records (Incidents etc.) are NOT in Update Sets. Config only.</li>
      <li>Default Update Set always exists. You can create custom ones.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Update Sets capture all data" — <strong>FALSE</strong>. Configuration changes only.</li>
      <li>"You can commit without preview" — Technically possible but strongly discouraged. Preview catches conflicts.</li>
      <li>"Default Update Set can be deleted" — <strong>FALSE</strong>.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-11', number:'11',
  title:'Reference Fields & Dot Walking',
  tags:['Reference Fields','Dot Walk','Related Fields'],
  content:`
<p class="chapter-intro">Reference field = Pointer to another record. Dot Walking = Following that pointer to access related fields.</p>
<h3>Reference Fields</h3>
<ul>
  <li>A field whose value is a <strong>sys_id</strong> of a record in another table.</li>
  <li>Displays the <strong>display value</strong> (usually the Name field) of the referenced record.</li>
  <li>Example: Incident's <span class="kw">Assigned to</span> field references <span class="kw">sys_user</span> table.</li>
  <li>Referenced table is defined in the <strong>Reference</strong> attribute of the field.</li>
</ul>
<h3>Dot Walking</h3>
<ul>
  <li>Access fields of a referenced record using dot notation.</li>
  <li>Syntax: <code>field_name.related_field</code></li>
  <li>Example: <code>assigned_to.department</code> → Gets the Department of the assigned user.</li>
  <li>Can go multiple levels deep: <code>assigned_to.manager.email</code></li>
  <li>Used in: Conditions, Reports, Email Notifications, Scripts.</li>
</ul>
<div class="block block--example">
  <div class="block__label"><span class="block__icon">📘</span> Example</div>
  <div class="block__body">
    <p>On an Incident record: <code>caller_id.department.name</code> → Walks from Incident → Caller (sys_user) → Department → Department Name.</p>
    <p>In a report filter: Show incidents where <code>assigned_to.location</code> = "New York".</p>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Reference field = Door to another table.</li>
      <li>Dot Walk = Walking through that door to grab something inside.</li>
      <li>Each dot = one table hop.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>Dot walking too deep (4+ levels) causes performance issues. Avoid in large queries.</li>
      <li>"Reference field stores the record name" — <strong>FALSE</strong>. It stores the <span class="kw">sys_id</span>. Display value is shown for readability.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-12', number:'12',
  title:'Time Zone & Personalization',
  tags:['Time Zone','Personalization','User Preferences'],
  content:`
<p class="chapter-intro">ServiceNow stores all time in UTC. User time zones just change the display. Personalization = per-user UI preferences.</p>
<h3>Time Zones</h3>
<ul>
  <li>All date/time values stored in DB as <strong>UTC</strong>.</li>
  <li>Displayed in the <strong>user's time zone</strong> (from their profile).</li>
  <li>System-level time zone set in <span class="kw">System Properties</span>.</li>
  <li>User profile time zone overrides system time zone for that user.</li>
</ul>
<h3>Personalization</h3>
<ul>
  <li>Users can personalise: List columns, Form layout (their view), Language, Date format, Time zone.</li>
  <li>Accessed via: <strong>User Menu → Profile</strong> or clicking the column header gear icon.</li>
  <li>List Personalization: Add/remove/reorder columns in a list view for yourself.</li>
  <li>Does NOT affect other users.</li>
  <li>Admin can reset user personalization.</li>
</ul>
<h3>Language</h3>
<ul>
  <li>ServiceNow supports multiple languages via the <strong>I18N plugin</strong>.</li>
  <li>User can select their preferred language in profile.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>UTC in DB. Time zone = display only. Never changes stored value.</li>
      <li>Personalization = "My preferences only." Others unaffected.</li>
      <li>Admin resets personalization if user breaks their view.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Changing time zone changes stored data" — <strong>FALSE</strong>. Only changes how time is displayed.</li>
      <li>"List personalization affects all users" — <strong>FALSE</strong>. Only affects the user who made the change.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-13', number:'13',
  title:'Reporting vs Performance Analytics',
  tags:['Reporting','Performance Analytics','PA'],
  content:`
<p class="chapter-intro">Reporting = Snapshot of data right now. Performance Analytics = Historical trending over time. Two completely different tools.</p>
<h3>Reporting</h3>
<ul>
  <li>Built-in. No extra plugin needed.</li>
  <li>Shows current state of data in a table.</li>
  <li>Types: Bar, Pie, List, Trend, Pivot, Heat Map, Single Score.</li>
  <li>Cannot track changes over time historically.</li>
  <li>Scheduled reports = emailed at intervals.</li>
  <li>Stored in <span class="kw">report_view</span> table.</li>
</ul>
<h3>Performance Analytics (PA)</h3>
<ul>
  <li>Requires the <strong>Performance Analytics plugin</strong>.</li>
  <li>Collects <strong>snapshots</strong> of metric values at scheduled intervals.</li>
  <li>Enables <strong>trending</strong> and <strong>historical comparison</strong>.</li>
  <li>Key concepts: <strong>Indicator</strong> (what to measure), <strong>Breakdown</strong> (how to segment), <strong>Score</strong> (collected value).</li>
  <li>Dashboard widget: <strong>Analytics Hub</strong>.</li>
  <li>Requires a <span class="kw">pa_admin</span> role to configure.</li>
</ul>
<div class="compare-grid">
  <div class="compare-col compare-col--a">
    <div class="compare-col__heading">Reporting</div>
    <ul>
      <li>Current data only</li>
      <li>No plugin needed</li>
      <li>Instant, point-in-time</li>
      <li>Standard charts</li>
    </ul>
  </div>
  <div class="compare-col compare-col--b">
    <div class="compare-col__heading">Performance Analytics</div>
    <ul>
      <li>Historical + trending</li>
      <li>Plugin required</li>
      <li>Scheduled collection</li>
      <li>Indicators + Scores</li>
    </ul>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Report = Photo. PA = Time-lapse video.</li>
      <li>Need to show "how many incidents last 6 months trended"? → PA.</li>
      <li>Need "how many open incidents right now"? → Report.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Reports can show historical trends automatically" — <strong>FALSE</strong>. Trend reports show a range but do NOT store snapshots. PA stores snapshots.</li>
      <li>"PA is included by default" — <strong>FALSE</strong>. Plugin required.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-14', number:'14',
  title:'Data Policy vs UI Policy',
  tags:['Data Policy','UI Policy','Mandatory','Read Only'],
  content:`
<p class="chapter-intro">UI Policy = Browser enforcement only. Data Policy = Enforced everywhere — browser, integrations, imports, scripts.</p>
<h3>UI Policy</h3>
<ul>
  <li>Runs on <strong>client side</strong> (browser/form only).</li>
  <li>Makes fields: Mandatory, Read-Only, Hidden.</li>
  <li>Only active when user is on the form.</li>
  <li>Bypassed by: REST API, Import Sets, Scripts.</li>
</ul>
<h3>Data Policy</h3>
<ul>
  <li>Runs on <strong>server side</strong>.</li>
  <li>Makes fields: Mandatory, Read-Only.</li>
  <li>Enforced on: Forms, API calls, Import Sets, Business Rules — everywhere.</li>
  <li>Cannot hide fields (that's UI Policy only).</li>
  <li>"Apply to REST API" checkbox — controls if API enforces the policy.</li>
</ul>
<div class="compare-grid">
  <div class="compare-col compare-col--a">
    <div class="compare-col__heading">UI Policy</div>
    <ul>
      <li>Client-side only</li>
      <li>Mandatory / ReadOnly / <strong>Hidden</strong></li>
      <li>Bypassed by API/Scripts</li>
      <li>Form only</li>
    </ul>
  </div>
  <div class="compare-col compare-col--b">
    <div class="compare-col__heading">Data Policy</div>
    <ul>
      <li>Server-side</li>
      <li>Mandatory / ReadOnly only</li>
      <li>Enforced everywhere</li>
      <li>Cannot hide fields</li>
    </ul>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>UI Policy = Bouncer at the door (form only). Sneaks can use the back door (API).</li>
      <li>Data Policy = Bouncer everywhere — every door, every entrance.</li>
      <li>Only UI Policy can <strong>hide</strong> fields. Data Policy cannot.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Data Policy can hide fields" — <strong>FALSE</strong>. Only Mandatory and Read-Only.</li>
      <li>"UI Policy is enforced during REST API calls" — <strong>FALSE</strong>. UI Policy is browser-only.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-15', number:'15',
  title:'Dictionary',
  tags:['Dictionary','Fields','Field Attributes'],
  content:`
<p class="chapter-intro">The Dictionary defines every field on every table — its type, attributes, constraints, and metadata. It is the schema layer of ServiceNow.</p>
<h3>What is the Dictionary?</h3>
<ul>
  <li>Stored in <span class="kw">sys_dictionary</span> table.</li>
  <li>Every field on every table has a Dictionary entry.</li>
  <li>Defines: <strong>Field Type</strong>, <strong>Max Length</strong>, <strong>Default Value</strong>, <strong>Mandatory</strong>, <strong>Read Only</strong>, <strong>Display</strong> field flag.</li>
</ul>
<h3>Field Types (Common)</h3>
<ul>
  <li><span class="kw">String</span> — Text field.</li>
  <li><span class="kw">Integer</span> — Whole number.</li>
  <li><span class="kw">Boolean</span> — True/False (checkbox).</li>
  <li><span class="kw">Reference</span> — Pointer to another table's record.</li>
  <li><span class="kw">Choice</span> — Dropdown list.</li>
  <li><span class="kw">Date/Time</span> — Stored as UTC.</li>
  <li><span class="kw">Journal</span> — Append-only field (e.g., Work Notes, Comments).</li>
  <li><span class="kw">Glide List</span> — Multiple references (comma-separated sys_ids).</li>
</ul>
<h3>Dictionary Overrides</h3>
<ul>
  <li>Child tables can <strong>override</strong> a field's attributes inherited from parent.</li>
  <li>Example: Make a field mandatory on Incident but not on Task (parent).</li>
</ul>
<h3>Display Value</h3>
<ul>
  <li>Only one field per table can be the <strong>Display</strong> field.</li>
  <li>This is shown when the table is referenced by another table.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Dictionary = Blueprint for every field in ServiceNow.</li>
      <li>sys_dictionary = where the Dictionary lives.</li>
      <li>Dictionary Override = Child customises what it inherited from parent.</li>
      <li>Display field = The "name" others see when referencing this table.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Journal fields can be edited after saving" — <strong>FALSE</strong>. Journal fields are append-only. Once saved, existing entries cannot be changed.</li>
      <li>"Each table can have multiple Display fields" — <strong>FALSE</strong>. Only one field can be the display field per table.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-16', number:'16',
  title:'Tables & Columns',
  tags:['Tables','Columns','Schema','Inheritance'],
  content:`
<p class="chapter-intro">ServiceNow is a database platform. Tables hold records. Columns are fields. Tables can extend other tables (inheritance).</p>
<h3>Tables</h3>
<ul>
  <li>Stored as <span class="kw">sys_db_object</span> entries.</li>
  <li>Every table has a <span class="kw">sys_id</span> column — unique record identifier (32-char GUID).</li>
  <li>Tables are either <strong>Base tables</strong> or <strong>Extended tables</strong> (child).</li>
</ul>
<h3>Table Inheritance</h3>
<ul>
  <li>Child tables inherit all columns from parent.</li>
  <li>Records from child and parent share the same <strong>physical table</strong> in the DB.</li>
  <li>Differentiated by <span class="kw">sys_class_name</span> field.</li>
  <li>Example: <span class="kw">Incident</span> extends <span class="kw">Task</span>. Task fields (number, state, priority) exist on Incident too.</li>
</ul>
<h3>Key Base Tables</h3>
<ul>
  <li><span class="kw">task</span> — Parent of Incident, Change, Problem, SC Task.</li>
  <li><span class="kw">cmdb_ci</span> — Parent of all CI classes.</li>
  <li><span class="kw">sys_user</span> — Users.</li>
  <li><span class="kw">sys_user_group</span> — Groups.</li>
  <li><span class="kw">sc_request</span> — REQ. <span class="kw">sc_req_item</span> — RITM.</li>
</ul>
<h3>Custom Tables</h3>
<ul>
  <li>Custom tables are prefixed with <span class="kw">u_</span> by default.</li>
  <li>Created via Studio or Table Builder.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Task is the grandfather of all work tables. Incident/Change/Problem are grandchildren.</li>
      <li>sys_class_name = "Who am I really?" (distinguishes child records).</li>
      <li>Custom table = u_ prefix. Always.</li>
      <li>sys_id = DNA of every record. 32-char GUID. Always unique.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Extended tables have their own physical DB table" — <strong>FALSE</strong>. They share the parent's physical table, separated by sys_class_name.</li>
      <li>"Custom tables always start with x_" — <strong>FALSE</strong>. Scoped app tables start with x_. Normal custom tables start with u_.</li>
    </ul>
  </div>
</div>`
},

];
