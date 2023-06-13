<h1>Authenticated API</h1>
<h3>Simple api that provides authenticated endpoints</h3>

<table>
    <thead>
      <tr>
        <th>Endpoint</th>
        <th>Http method</th>
        <th>Payload</th>
      </tr>  
    </thead>
    <tbody>
        <tr>
            <td>/register</td>
            <td>POST</td>
            <td>{ name: string, email: string, password: string, passwordConfirm: string }</td>
        </tr>
        <tr>
            <td>/login</td>
            <td>POST</td>
            <td>{ email: string, password: string }</td>
        </tr>
    </tbody>
</table>

<h2>Data types</h2>

```
Course {
	id: UUID
	title: string
	description: string
	instructor: string
	category: Category
}

Category = "Programming" | "Design" | "Business"
```


