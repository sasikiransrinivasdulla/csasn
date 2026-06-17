/* chapters_4.js — Chapters 25-30 */
const CHAPTERS_4 = [

{
  id:'ch-25', number:'25',
  title:'CMDB',
  tags:['CMDB','Configuration Management','CI Classes'],
  content:`
<p class="chapter-intro">CMDB = Configuration Management Database. The single source of truth for all IT assets and their relationships in ServiceNow.</p>
<h3>CMDB Architecture</h3>
<ul>
  <li>Base table: <span class="kw">cmdb</span>. Extended by <span class="kw">cmdb_ci</span> (Configuration Item base class).</li>
  <li>All CI classes extend <span class="kw">cmdb_ci</span>: servers, applications, databases, network devices.</li>
  <li>CI Classes: <span class="kw">cmdb_ci_server</span>, <span class="kw">cmdb_ci_computer</span>, <span class="kw">cmdb_ci_application</span>, <span class="kw">cmdb_ci_service</span>.</li>
</ul>
<h3>CMDB Health</h3>
<ul>
  <li><strong>Completeness</strong> — Are all required fields filled in?</li>
  <li><strong>Compliance</strong> — Does the CI meet defined rules?</li>
  <li><strong>Correctness</strong> — Is the data accurate and up to date?</li>
</ul>
<h3>Discovery & Service Mapping</h3>
<ul>
  <li><strong>Discovery</strong> — Automatically finds CIs in the network and populates CMDB. Requires the Discovery plugin.</li>
  <li><strong>Service Mapping</strong> — Maps relationships between CIs to build a service topology.</li>
</ul>
<h3>Relationships</h3>
<ul>
  <li>CI relationships stored in <span class="kw">cmdb_rel_ci</span>.</li>
  <li>Relationship types: "Runs on", "Depends on", "Hosted on", "Connects to".</li>
  <li>Used in Impact Analysis: "This server is down — what services are affected?"</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>CMDB = Map of your IT world. CIs = Cities on the map. Relationships = Roads between cities.</li>
      <li>Discovery = Robot that scans your network and fills the CMDB automatically.</li>
      <li>CMDB Health: Completeness + Compliance + Correctness = The 3 Cs.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"CMDB is the same as Asset Management" — <strong>FALSE</strong>. CMDB = operational/technical view. Asset = financial/procurement.</li>
      <li>"Discovery populates CMDB automatically without setup" — <strong>FALSE</strong>. Discovery requires configuration: credentials, IP ranges, patterns.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-26', number:'26',
  title:'Notifications',
  tags:['Notifications','Email','Events'],
  content:`
<p class="chapter-intro">Notifications send emails, SMS, or push alerts when conditions are met. Event-driven or condition-based.</p>
<h3>Notification Setup</h3>
<ul>
  <li>Navigate to: <strong>System Notification → Email → Notifications</strong>.</li>
  <li>Stored in <span class="kw">sysevent_email_action</span> table.</li>
  <li>A Notification has: <strong>When to send</strong> (trigger), <strong>Who to send to</strong> (recipients), <strong>What to send</strong> (subject + body).</li>
</ul>
<h3>When to Send — Trigger Types</h3>
<ul>
  <li><strong>Event-based</strong> — Fires when a specific event is triggered (e.g., <code>incident.commented</code>).</li>
  <li><strong>Record insert/update</strong> — Fires when a table record is created or modified with conditions.</li>
</ul>
<h3>Recipients</h3>
<ul>
  <li>Users, Groups, or explicit email addresses.</li>
  <li>Dynamic recipients via <strong>Recipient fields</strong>: e.g., "Caller", "Assigned to".</li>
  <li>Users can <strong>opt out</strong> via Notification Preferences (if allowed).</li>
</ul>
<h3>Email Templates</h3>
<ul>
  <li>Reusable HTML templates for email body.</li>
  <li>Use <strong>variables</strong> like <code>&#36;{incident.number}</code>, <code>&#36;{incident.short_description}</code>.</li>
</ul>
<h3>Notification Preferences</h3>
<ul>
  <li>Users can manage which notifications they receive.</li>
  <li>Admins can restrict opt-outs by marking notifications as <strong>mandatory</strong>.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Notification = WHO + WHEN + WHAT. All three must be configured.</li>
      <li>Event = Signal fired in the system. Notification = Response to that signal.</li>
      <li>Mandatory notification = User cannot opt out.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Notifications require Flow Designer" — <strong>FALSE</strong>. Notifications are independent. Flow Designer can call them, but they work without it.</li>
      <li>"All users receive all notifications" — <strong>FALSE</strong>. Users can opt out unless the notification is marked mandatory.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-27', number:'27',
  title:'User Table (sys_user)',
  tags:['sys_user','Users','User Table'],
  content:`
<p class="chapter-intro">sys_user is the most important table to know for CSA. Every person who interacts with ServiceNow is a record here.</p>
<h3>sys_user Table</h3>
<ul>
  <li>Table name: <span class="kw">sys_user</span>.</li>
  <li>One record = one user account.</li>
  <li>Key fields: <code>user_name</code>, <code>first_name</code>, <code>last_name</code>, <code>email</code>, <code>active</code>, <code>department</code>, <code>location</code>, <code>manager</code>, <code>time_zone</code>.</li>
  <li><code>active = false</code> → User cannot log in but record is preserved.</li>
</ul>
<h3>Related Tables</h3>
<ul>
  <li><span class="kw">sys_user_role</span> — Roles in the system.</li>
  <li><span class="kw">sys_user_has_role</span> — Junction table: which user has which role.</li>
  <li><span class="kw">sys_user_group</span> — Groups table.</li>
  <li><span class="kw">sys_user_grmember</span> — Group membership junction.</li>
</ul>
<h3>VIP Flag</h3>
<ul>
  <li><code>vip</code> field on sys_user — Boolean. Marks a user as VIP.</li>
  <li>Can be used in ACL conditions and Business Rules to provide VIP-level service.</li>
</ul>
<div class="block block--example">
  <div class="block__label"><span class="block__icon">📘</span> Example</div>
  <div class="block__body">
    <p>To find all users in the "IT Support" group, query <span class="kw">sys_user_grmember</span> where <code>group.name = IT Support</code>, then dot walk to <code>user.email</code> to get their emails.</p>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>sys_user = The people table. Everything user-related starts here.</li>
      <li>Deactivating user → set active = false. Never delete users.</li>
      <li>sys_user_grmember = bridge table between sys_user and sys_user_group.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Deleting a user is the right way to deactivate them" — <strong>FALSE</strong>. Set active = false. Deleting breaks audit trails and historical records.</li>
      <li>"sys_user and sys_user_group are the same table" — <strong>FALSE</strong>. Completely separate tables joined by sys_user_grmember.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-28', number:'28',
  title:'ServiceNow Exam Killer Pairs',
  tags:['Exam Tips','Killer Pairs','CSA Traps'],
  content:`
<p class="chapter-intro">The CSA exam loves to test "killer pairs" — concepts that look similar but are fundamentally different. Master these and you eliminate the most common wrong answers.</p>
<h3>The Ultimate Killer Pairs List</h3>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Killer Pair 1 — Catalog Item vs Record Producer</div>
  <div class="block__body">
    <ul>
      <li><strong>Catalog Item</strong> → Always creates a <span class="kw">RITM</span>.</li>
      <li><strong>Record Producer</strong> → Creates a record on <em>any table</em>. NOT a RITM.</li>
    </ul>
  </div>
</div>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Killer Pair 2 — UI Policy vs Data Policy</div>
  <div class="block__body">
    <ul>
      <li><strong>UI Policy</strong> → Client side only. Bypassed by API. CAN hide fields.</li>
      <li><strong>Data Policy</strong> → Server side. Enforced everywhere. CANNOT hide fields.</li>
    </ul>
  </div>
</div>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Killer Pair 3 — Report vs Performance Analytics</div>
  <div class="block__body">
    <ul>
      <li><strong>Report</strong> → Point-in-time. No plugin. Current data.</li>
      <li><strong>PA</strong> → Historical snapshots. Plugin required. Tracks trends.</li>
    </ul>
  </div>
</div>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Killer Pair 4 — ACL vs User Criteria</div>
  <div class="block__body">
    <ul>
      <li><strong>ACL</strong> → Controls table/field/record access. System-wide.</li>
      <li><strong>User Criteria</strong> → Controls KB and Catalog access. Not ACL.</li>
    </ul>
  </div>
</div>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Killer Pair 5 — Order Guide vs Catalog Item</div>
  <div class="block__body">
    <ul>
      <li><strong>Catalog Item</strong> → One item = one RITM.</li>
      <li><strong>Order Guide</strong> → Bundle of items = one REQ, multiple RITMs.</li>
    </ul>
  </div>
</div>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Killer Pair 6 — UI Policy vs UI Action</div>
  <div class="block__body">
    <ul>
      <li><strong>UI Policy</strong> → Auto-fires. Controls field attributes (M/RO/Hidden).</li>
      <li><strong>UI Action</strong> → Button/link. User must click. Runs scripts.</li>
    </ul>
  </div>
</div>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Killer Pair 7 — Import Set vs Update Set</div>
  <div class="block__body">
    <ul>
      <li><strong>Import Set</strong> → Loads external DATA into ServiceNow tables.</li>
      <li><strong>Update Set</strong> → Moves CONFIGURATION changes between instances.</li>
    </ul>
  </div>
</div>

<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory — Quick Fire</div>
  <div class="block__body">
    <ul>
      <li>RITM → Catalog Item. NOT Record Producer. NOT Order Guide directly.</li>
      <li>Hidden → UI Policy. NOT Data Policy.</li>
      <li>Historical → PA. NOT Reports.</li>
      <li>Data in → Import Set. Config out → Update Set.</li>
      <li>Buttons → UI Action. Field rules → UI Policy.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-29', number:'29',
  title:'ACL vs User Criteria',
  tags:['ACL','User Criteria','Security','KB'],
  content:`
<p class="chapter-intro">ACL and User Criteria both control access, but they operate in completely different domains. Mixing them up is a classic CSA exam mistake.</p>
<h3>ACL (Access Control List)</h3>
<ul>
  <li>Controls access to: <strong>Tables</strong>, <strong>Fields</strong>, <strong>Records</strong>.</li>
  <li>Operations: read, write, create, delete.</li>
  <li>Evaluated via: Role check → Condition check → Script check (all must pass).</li>
  <li>Stored in: <span class="kw">sys_security_acl</span>.</li>
  <li>Applies to: All modules, all tables across the platform.</li>
</ul>
<h3>User Criteria</h3>
<ul>
  <li>Controls access to: <strong>Knowledge Bases</strong> and <strong>Service Catalog</strong> items.</li>
  <li>Does NOT control table/field/record access in general.</li>
  <li>Separate from ACL engine.</li>
  <li>Stored in: <span class="kw">user_criteria</span> table.</li>
  <li>Conditions based on: User, Role, Group, Location, Department, Company.</li>
  <li>Two types per KB: <strong>Can Read</strong> and <strong>Can Contribute</strong>.</li>
</ul>
<div class="compare-grid">
  <div class="compare-col compare-col--a">
    <div class="compare-col__heading">ACL</div>
    <ul>
      <li>Tables / Fields / Records</li>
      <li>sys_security_acl table</li>
      <li>Role + Condition + Script</li>
      <li>Platform-wide</li>
      <li>read/write/create/delete</li>
    </ul>
  </div>
  <div class="compare-col compare-col--b">
    <div class="compare-col__heading">User Criteria</div>
    <ul>
      <li>KB + Service Catalog only</li>
      <li>user_criteria table</li>
      <li>User / Group / Role / Dept</li>
      <li>KB & Catalog scoped</li>
      <li>Can Read / Can Contribute</li>
    </ul>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>ACL = General platform security guard. Guards every table and field.</li>
      <li>User Criteria = Librarian. Controls who reads and writes in the Knowledge library and Catalog store.</li>
      <li>They can coexist. A user must pass BOTH to access a KB article on a secured table.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"User Criteria replaces ACL for KB" — <strong>FALSE</strong>. ACL still applies to the KB table. User Criteria adds an additional layer.</li>
      <li>"ACL controls who can read Knowledge articles" — <strong>PARTIALLY FALSE</strong>. ACL controls table access, User Criteria controls KB-specific read/contribute rights.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-30', number:'30',
  title:'Ultimate CSA Mental Model',
  tags:['Mental Model','CSA Summary','Exam Strategy'],
  content:`
<p class="chapter-intro">A complete mental framework for the CSA exam. Use this as your final revision before the test. 🎯</p>

<h3>The ServiceNow Platform at a Glance</h3>
<div class="block block--info">
  <div class="block__label"><span class="block__icon">🏗️</span> Platform Architecture</div>
  <div class="block__body">
    <ul>
      <li><strong>Database</strong>: Tables (sys_db_object) → Records → Fields (sys_dictionary). Everything is a table.</li>
      <li><strong>Security</strong>: ACL (table/field/record) + Roles + User Criteria (KB/Catalog).</li>
      <li><strong>Automation</strong>: Flow Designer (no-code) → Business Rules (server script) → Client Scripts (browser).</li>
      <li><strong>UI</strong>: Forms + Lists + Service Portal + UI16 + Next Experience.</li>
      <li><strong>Integration</strong>: Import Sets + Transform Maps + REST/SOAP APIs.</li>
      <li><strong>Migration</strong>: Update Sets (config) → Export XML → Import → Preview → Commit.</li>
    </ul>
  </div>
</div>

<h3>The 10 Laws of CSA</h3>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> Memorize These Cold</div>
  <div class="block__body">
    <ol style="padding-left:1.5rem;list-style:decimal;">
      <li>Everything is a table. Every feature stores data somewhere in sys_db_object.</li>
      <li>Catalog Item → RITM. Record Producer → any table record. Order Guide → REQ + multiple RITMs.</li>
      <li>UI Policy = client only. Data Policy = server, everywhere. Hidden = UI Policy ONLY.</li>
      <li>Report = now. Performance Analytics = history. PA needs a plugin.</li>
      <li>ACL = table/field/record security. User Criteria = KB + Catalog access only.</li>
      <li>Import Set = external data in. Update Set = config changes out.</li>
      <li>Coalesce = duplicate prevention in Transform Maps.</li>
      <li>sys_user = people. sys_user_group = groups. sys_user_grmember = bridge. Never delete users, deactivate.</li>
      <li>High Security Plugin = deny by default if no ACL matches.</li>
      <li>All time stored in UTC. Time zone = display only, never changes stored data.</li>
    </ol>
  </div>
</div>

<h3>Decision Tree — "Which Tool?"</h3>
<div class="block block--example">
  <div class="block__label"><span class="block__icon">📘</span> Quick Decision Guide</div>
  <div class="block__body">
    <ul>
      <li>Make a field mandatory on a form only → <strong>UI Policy</strong></li>
      <li>Make a field mandatory everywhere including API → <strong>Data Policy</strong></li>
      <li>Hide a field based on a condition → <strong>UI Policy</strong> (only option)</li>
      <li>Create a button on a form → <strong>UI Action</strong></li>
      <li>Send an email when incident closes → <strong>Notification</strong></li>
      <li>Automate multi-step process → <strong>Flow Designer</strong></li>
      <li>Load external CSV data → <strong>Import Set + Transform Map</strong></li>
      <li>Move config from Dev to Prod → <strong>Update Set</strong></li>
      <li>Track metrics over 6 months → <strong>Performance Analytics</strong></li>
      <li>Control who reads KB articles → <strong>User Criteria</strong></li>
      <li>Control who reads Incident records → <strong>ACL</strong></li>
    </ul>
  </div>
</div>

<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> Final Trap Reminders</div>
  <div class="block__body">
    <ul>
      <li>Record Producer ≠ RITM creator.</li>
      <li>Data Policy cannot hide. UI Policy cannot enforce on API.</li>
      <li>PA ≠ Reports. PA needs plugin.</li>
      <li>User Criteria ≠ ACL. Different tables, different scope.</li>
      <li>Import Set ≠ Update Set. Data vs Configuration.</li>
      <li>Deleting users = wrong. active = false = right.</li>
      <li>No ACL + No High Security Plugin = Access Granted (dangerous!).</li>
      <li>No ACL + High Security Plugin = Access Denied (safe!).</li>
    </ul>
  </div>
</div>

<div class="block block--memory">
  <div class="block__label"><span class="block__icon">🎯</span> You've Got This</div>
  <div class="block__body">
    <p>Study the killer pairs. Master the 10 laws. Know your tables. The CSA exam rewards pattern recognition and specificity of knowledge over general familiarity. Go pass it! 💪</p>
  </div>
</div>`
},

];
