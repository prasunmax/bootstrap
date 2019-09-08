package prasun.bootstrap.config;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class PersistenceConfiguration {
	@Bean
	@ConfigurationProperties("spring.datasource")
	@Primary
	public DataSource dataSource() {
		return DataSourceBuilder.create().build();
	}
	@Bean
	@ConfigurationProperties("datasource.flyway")
	@FlywayDataSource
	public DataSource flywayDataSource() {
		return DataSourceBuilder.create().build();
	}
}
