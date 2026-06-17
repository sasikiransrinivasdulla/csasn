/* chapters_3.js — Chapters 17-24 */
const CHAPTERS_3 = [

{
  id:'ch-17', number:'17',
  title:'Boolean Fields',
  tags:['Boolean','True/False','Checkbox'],
  content:`
<p class="chapter-intro">Boolean = True or False. In ServiceNow, displayed as a Checkbox on forms. Stored as 0/1 in the database.</p>
<h3>Boolean Basics</h3>
<ul>
  <li>Boolean field type in Dictionary = <span class="kw">true_false</span>.</li>
  <li>Displayed as a <strong>checkbox</strong> on forms.</li>
  <li>Values: <code>true</code> (checked) / <code>false</code> (unchecked).</li>
  <li>Stored in DB as: <code>1</code> (true) / <code>0</code> (false).</li>
  <li>Default value: usually <code>false</code> unless specified.</li>
</ul>
<h3>Using Booleans in Conditions</h3>
<ul>
  <li>In condition builder: <code>Active is true</code> or <code>Active is false</code>.</li>
  <li>In scripts: <code>current.active == true</code> or <code>current.active.getBooleanValue()</code>.</li>
</ul>
<h3>Common Boolean Fields</h3>
<ul>
  <li><span class="kw">active</span> — Is the record/user active?</li>
  <li><span class="kw">knowledge</span> — Is this incident flagged for KB creation?</li>
  <li><span class="kw">upon_approval</span> context — various approval flag fields.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Boolean on form = Checkbox. In DB = 1/0. In script = true/false.</li>
      <li>Always use <code>.getBooleanValue()</code> in scripts to safely retrieve boolean.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Boolean stored as true/false in DB" — <strong>FALSE</strong>. Stored as 1/0. The true/false is the GlideElement representation.</li>
      <li>Comparing <code>current.active == 'true'</code> (string) instead of <code>== true</code> (boolean) can cause logic errors in scripts.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-18', number:'18',
  title:'Flow Designer & Triggers',
  tags:['Flow Designer','Triggers','Automation'],
  content:`
<p class="chapter-intro">Flow Designer is a no-code/low-code automation tool. Triggers define WHEN a flow starts.</p>
<h3>Flow Structure</h3>
<ul>
  <li><strong>Trigger</strong> → <strong>Conditions</strong> → <strong>Actions</strong> → <strong>Flow Logic</strong> (if/else, loops, waits).</li>
</ul>
<h3>Trigger Types</h3>
<ul>
  <li><span class="kw">Record-based</span> — Fires when a record is Created, Updated, Deleted, or Created or Updated.</li>
  <li><span class="kw">Scheduled</span> — Runs at a set time/interval (like a cron job).</li>
  <li><span class="kw">Application</span> — Triggered by a specific ServiceNow app event.</li>
  <li><span class="kw">Inbound Email</span> — Fires when an email arrives on a specific address.</li>
  <li><span class="kw">Service Catalog</span> — Fires when a catalog item is ordered.</li>
  <li><span class="kw">SLA</span> — Fires on SLA breach/warning.</li>
</ul>
<h3>Run As</h3>
<ul>
  <li>Flow can run as: <strong>System</strong> (admin rights), <strong>User who triggered</strong>, or a <strong>specific user</strong>.</li>
  <li>Affects what records/fields the flow can access.</li>
</ul>
<h3>Subflows vs Actions</h3>
<ul>
  <li><strong>Subflow</strong> — A reusable flow. Called from other flows. Has inputs/outputs.</li>
  <li><strong>Action</strong> — A reusable single step. Like a function. Lowest reusable unit.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Trigger types: Record / Schedule / Application / Inbound Email / Service Catalog / SLA.</li>
      <li>Run As = Who's identity the flow uses. System = max access.</li>
      <li>Flow > Subflow > Action. Nesting order.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Flows always run as admin" — <strong>FALSE</strong>. Depends on "Run As" setting. Default is often System, but configurable.</li>
      <li>"Subflow is the same as Flow" — <strong>FALSE</strong>. Subflow is a reusable component called by a parent flow. It cannot run standalone from a trigger.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-19', number:'19',
  title:'Data Pills',
  tags:['Data Pills','Flow Designer','Variables'],
  content:`
<p class="chapter-intro">Data Pills are dynamic value references in Flow Designer — like variables that carry data between trigger, actions, and flow logic.</p>
<h3>What are Data Pills?</h3>
<ul>
  <li>Pill-shaped UI elements in Flow Designer representing a specific value.</li>
  <li>Carry data from: the <strong>Trigger record</strong>, previous <strong>Action outputs</strong>, or <strong>Flow Variables</strong>.</li>
  <li>Drag and drop pills into action input fields.</li>
</ul>
<h3>Pill Sources</h3>
<ul>
  <li><span class="kw">Trigger</span> — Fields of the triggering record (e.g., Incident Number, Priority).</li>
  <li><span class="kw">Action Output</span> — Results from a previous step (e.g., "Created Record" sys_id).</li>
  <li><span class="kw">Flow Variables</span> — Custom variables set within the flow.</li>
</ul>
<h3>Dot Walking with Pills</h3>
<ul>
  <li>Pills support dot-walking to access related fields.</li>
  <li>Example: Trigger Incident pill → dot walk → Assigned To → Email.</li>
</ul>
<div class="block block--example">
  <div class="block__label"><span class="block__icon">📘</span> Example</div>
  <div class="block__body">
    <p>Flow triggered on Incident creation. Action: "Send Notification". Recipient field uses pill: <code>Trigger → Incident Record → Caller → Email</code>. The flow dynamically picks the caller's email at runtime.</p>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Data Pill = Live variable in Flow Designer. Think of it as a smart placeholder.</li>
      <li>Pills flow forward — you can only use pills from earlier steps, not future ones.</li>
      <li>Pill + Dot Walk = Powerful. Access any related field without extra steps.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"You can use a pill from Step 5 in Step 2" — <strong>FALSE</strong>. Pills are only available from preceding steps.</li>
      <li>"Data Pills are only for notification messages" — <strong>FALSE</strong>. They are used in any action input field across all action types.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-20', number:'20',
  title:'Connect Chat',
  tags:['Connect Chat','Collaboration','Messaging'],
  content:`
<p class="chapter-intro">Connect Chat = Internal messaging within ServiceNow. Like Slack but built into the platform.</p>
<h3>Connect Chat Features</h3>
<ul>
  <li>Real-time messaging between ServiceNow users.</li>
  <li><strong>Direct messages</strong> — One-on-one conversations.</li>
  <li><strong>Group conversations</strong> — Multiple participants.</li>
  <li><strong>Record conversations</strong> — Chat attached to a specific record (Incident, Change, etc.).</li>
  <li>Supports file/document sharing.</li>
  <li>Available in the ServiceNow banner (top navigation area).</li>
</ul>
<h3>Connect Support</h3>
<ul>
  <li>Allows agents to <strong>chat with end users</strong> (fulfiller ↔ requester).</li>
  <li>Requires the <strong>Connect Support plugin</strong>.</li>
  <li>Different from Connect Chat (internal agent-to-agent).</li>
</ul>
<h3>Notifications</h3>
<ul>
  <li>Users receive in-app notifications for new messages.</li>
  <li>Can be configured to send email notifications for missed messages.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Connect Chat = Agent to Agent internal messaging.</li>
      <li>Connect Support = Agent to End User. Requires plugin.</li>
      <li>Record conversation = Chat tied to a specific ticket.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Connect Chat and Connect Support are the same" — <strong>FALSE</strong>. Chat = internal. Support = fulfiller-to-end-user channel. Support needs extra plugin.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-21', number:'21',
  title:'Knowledge Roles',
  tags:['Knowledge','Roles','KB Access'],
  content:`
<p class="chapter-intro">Knowledge Base has its own role system. Three key roles govern who manages, contributes, and reads articles.</p>
<h3>Knowledge Roles</h3>
<ul>
  <li><span class="kw">knowledge</span> — Can create and edit KB articles. Basic contributor role.</li>
  <li><span class="kw">knowledge_manager</span> — Manages a specific Knowledge Base (set categories, manage articles in that KB).</li>
  <li><span class="kw">knowledge_admin</span> — Platform-wide KB administration. Creates KBs, sets user criteria globally.</li>
</ul>
<h3>User Criteria (KB Access Control)</h3>
<ul>
  <li>Separate from ACL and roles.</li>
  <li><strong>Can Read</strong> criteria — Who can view articles in this KB.</li>
  <li><strong>Can Contribute</strong> criteria — Who can create/edit articles.</li>
  <li>Criteria can be based on: User, Group, Role, Location, Department, Company.</li>
</ul>
<h3>Article Workflow</h3>
<ul>
  <li>Draft → (Optionally) Review → Published → Retired.</li>
  <li>Only users with <span class="kw">knowledge</span> role or higher can publish/retire.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>knowledge = Writer. knowledge_manager = Editor-in-Chief of one KB. knowledge_admin = Publisher across all KBs.</li>
      <li>User Criteria ≠ ACL. They coexist. User Criteria is KB-specific access.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"knowledge_manager manages all KBs" — <strong>FALSE</strong>. Manages only the KBs assigned to them. knowledge_admin manages all.</li>
      <li>"ACL controls KB article visibility" — <strong>FALSE for article content</strong>. User Criteria controls KB-level read access. ACL still applies at the table level for sys_kb_knowledge.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-22', number:'22',
  title:'Personas',
  tags:['Personas','Roles','User Types'],
  content:`
<p class="chapter-intro">Personas describe types of ServiceNow users by their role in the organisation. Understanding personas helps answer "who uses what" questions in the CSA exam.</p>
<h3>Core Personas</h3>
<ul>
  <li><strong>Requester / End User</strong> — Submits requests via Service Portal or Service Catalog. Does not need ITIL role. Uses self-service.</li>
  <li><strong>Fulfiller / Agent</strong> — Processes tickets (Incident, Change, etc.). Typically has <span class="kw">itil</span> role. Works in the backend instance.</li>
  <li><strong>System Administrator</strong> — Full platform access. Has <span class="kw">admin</span> role. Configures the system.</li>
  <li><strong>Manager / Approver</strong> — Approves requests, views reports. May have <span class="kw">approver_user</span> role.</li>
  <li><strong>Developer</strong> — Builds apps, scripts, flows. Works in dev instance. Has <span class="kw">admin</span> on dev.</li>
</ul>
<h3>Service Portal vs Backend</h3>
<ul>
  <li><strong>Service Portal</strong> — Consumer-facing. Requesters use this to submit and track requests.</li>
  <li><strong>Backend (main UI)</strong> — Fulfillers/Admins use this to process work.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Requester = Customer. Fulfiller = Support Agent. Admin = IT God Mode.</li>
      <li>Service Portal = Front of house. Backend = Kitchen.</li>
      <li>itil role = minimum for fulfiller to process tickets.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-23', number:'23',
  title:'Branding & UI16',
  tags:['Branding','UI16','Theming'],
  content:`
<p class="chapter-intro">ServiceNow UI16 is the classic backend interface. Branding allows admins to customise the look — logo, colors, banner — without coding.</p>
<h3>UI16 Branding</h3>
<ul>
  <li>Accessible via: <strong>System Properties → Basic Configuration UI16</strong>.</li>
  <li>Customise: <strong>Banner Image</strong> (logo), <strong>Banner Text</strong>, <strong>Banner Color</strong>, <strong>Navigation Background Color</strong>.</li>
  <li>Changes apply platform-wide for all users.</li>
  <li>No coding required — all point-and-click.</li>
</ul>
<h3>Themes</h3>
<ul>
  <li>System comes with default themes (e.g., System, Stock).</li>
  <li>Custom themes can be created in <span class="kw">System UI → Themes</span>.</li>
  <li>Themes control CSS variables like fonts, header colors, sidebar colors.</li>
</ul>
<h3>Next Experience (Polaris)</h3>
<ul>
  <li>Newer UI replacing UI16. Unified Navigation.</li>
  <li>Branding in Next Experience uses a different configuration path.</li>
  <li>CSA exam primarily tests UI16 concepts.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Branding = Basic Config UI16 in System Properties. No coding.</li>
      <li>Logo + Colors + Banner = what you can change.</li>
      <li>Themes = Deeper CSS-level customisation. More control.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Branding changes affect only your user" — <strong>FALSE</strong>. Branding is system-wide, all users see it.</li>
      <li>"You need to write CSS to change the banner color" — <strong>FALSE</strong>. Basic Config UI16 provides a color picker, no CSS needed.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-24', number:'24',
  title:'Access Control Processing Order',
  tags:['ACL','Processing Order','Security'],
  content:`
<p class="chapter-intro">When multiple ACLs could apply, ServiceNow picks the most specific one. Understanding specificity order is critical for CSA.</p>
<h3>ACL Specificity — Most to Least</h3>
<ol>
  <li><strong>table_name.field_name</strong> — Exact table, exact field. Most specific.</li>
  <li><strong>table_name.None</strong> — Specific table, any field (catch-all for that table).</li>
  <li><strong>*.field_name</strong> — Any table, specific field name.</li>
  <li><strong>*.None</strong> — Any table, any field. Least specific. Global fallback.</li>
</ol>
<h3>How ACL Evaluation Works</h3>
<ul>
  <li>ServiceNow checks from most specific to least specific.</li>
  <li>First matching ACL is evaluated — its <strong>Role</strong>, <strong>Condition</strong>, and <strong>Script</strong> must ALL pass.</li>
  <li>If all three pass → Access <strong>granted</strong>.</li>
  <li>If any one fails → Access <strong>denied</strong>.</li>
  <li>If <strong>no ACL matches</strong>: without High Security plugin → granted. With plugin → denied.</li>
</ul>
<h3>ACL Operations</h3>
<ul>
  <li><span class="kw">read</span> — View record/field.</li>
  <li><span class="kw">write</span> — Edit field value.</li>
  <li><span class="kw">create</span> — Insert new record.</li>
  <li><span class="kw">delete</span> — Delete a record.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Specificity ladder: table.field → table.* → *.field → *.* </li>
      <li>All three gates (Role + Condition + Script) must open. One locked = denied.</li>
      <li>High Security = "No ACL = Denied." Normal = "No ACL = Granted."</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"The first ACL found grants access" — <strong>FALSE</strong>. The ACL found must PASS all its conditions. Finding an ACL and passing it are different things.</li>
      <li>"Admin role bypasses all ACLs" — Partially true. Built-in admin bypasses most ACLs but not elevated-security ones.</li>
    </ul>
  </div>
</div>`
},

];
