def main():
    import pandas as pd
    from pathlib import Path

    # =====================================================
    # Project Paths
    # =====================================================

    BASE_DIR = Path(__file__).resolve().parent
    DATA_DIR = BASE_DIR / "data"

    DAILY_FILE = DATA_DIR / "daily_dataset.csv"
    WEATHER_FILE = DATA_DIR / "weather_daily_darksky.csv"

    # =====================================================
    # Load Datasets
    # =====================================================

    print("=" * 60)
    print("Loading datasets...")
    print("=" * 60)

    # Load only first 200000 rows for faster training
    daily_df = pd.read_csv(DAILY_FILE, nrows=200000)

    weather_df = pd.read_csv(WEATHER_FILE)

    print(f"Daily Dataset Shape   : {daily_df.shape}")
    print(f"Weather Dataset Shape : {weather_df.shape}")

    # =====================================================
    # Convert Date Columns
    # =====================================================

    print("\nConverting date columns...")

    daily_df["day"] = pd.to_datetime(daily_df["day"])

    weather_df["time"] = pd.to_datetime(weather_df["time"])

    print("Date conversion completed.")

    # =====================================================
    # Select Required Weather Columns
    # =====================================================

    # We don't need all 32 weather columns.
    # Keeping only useful ones makes training faster.

    weather_df = weather_df[
        [
            "time",
            "temperatureMax",
            "temperatureMin",
            "humidity",
            "windSpeed",
            "pressure",
        ]
    ]

    print("\nSelected Weather Columns:")
    print(weather_df.columns.tolist())

    # =====================================================
    # Rename Weather Date Column
    # =====================================================

    weather_df.rename(
        columns={
            "time": "day"
        },
        inplace=True
    )

    # =====================================================
    # Remove Missing Values
    # =====================================================

    print("\nChecking missing values...")

    daily_df = daily_df.dropna()

    weather_df = weather_df.dropna()

    print("Daily Shape After Cleaning   :", daily_df.shape)
    print("Weather Shape After Cleaning :", weather_df.shape)

    # =====================================================
    # Sort Data
    # =====================================================

    print("\nSorting dataset...")

    daily_df = daily_df.sort_values(
        by=["LCLid", "day"]
    ).reset_index(drop=True)

    weather_df = weather_df.sort_values(
        by="day"
    ).reset_index(drop=True)

    print("Sorting completed.")

    # =====================================================
    # Create Lag Features
    # =====================================================

    print("\nCreating historical features...")

    # Previous day's energy consumption
    daily_df["lag_1"] = daily_df.groupby("LCLid")["energy_sum"].shift(1)

    # Two days ago
    daily_df["lag_2"] = daily_df.groupby("LCLid")["energy_sum"].shift(2)

    # Three days ago
    daily_df["lag_3"] = daily_df.groupby("LCLid")["energy_sum"].shift(3)

    # 7-day rolling average (using previous days only)
    daily_df["rolling_7"] = (
        daily_df.groupby("LCLid")["energy_sum"]
        .transform(lambda x: x.shift(1).rolling(window=7, min_periods=1).mean())
    )

    print("Historical features created successfully.")

    # =====================================================
    # Remove Rows with Missing Lag Values
    # =====================================================

    print("\nRemoving rows with missing lag values...")

    before_rows = len(daily_df)

    daily_df = daily_df.dropna().reset_index(drop=True)

    after_rows = len(daily_df)

    print(f"Rows before : {before_rows}")
    print(f"Rows after  : {after_rows}")
    print(f"Rows removed: {before_rows - after_rows}")

    # =====================================================
    # Merge Weather Data
    # =====================================================

    print("\nMerging weather data...")

    daily_df = daily_df.merge(
        weather_df,
        on="day",
        how="left"
    )

    print("Weather data merged successfully.")
    print("Dataset Shape :", daily_df.shape)

    # =====================================================
    # Remove Missing Weather Values
    # =====================================================

    print("\nRemoving missing weather values...")

    before_rows = len(daily_df)

    daily_df = daily_df.dropna().reset_index(drop=True)

    after_rows = len(daily_df)

    print(f"Rows before : {before_rows}")
    print(f"Rows after  : {after_rows}")
    print(f"Rows removed: {before_rows-after_rows}")

    # =====================================================
    # Create Date Features
    # =====================================================

    print("\nCreating date features...")

    daily_df["year"] = daily_df["day"].dt.year
    daily_df["month"] = daily_df["day"].dt.month
    daily_df["day_of_month"] = daily_df["day"].dt.day
    daily_df["day_of_week"] = daily_df["day"].dt.dayofweek
    daily_df["week_of_year"] = daily_df["day"].dt.isocalendar().week.astype(int)

    print("Date features created successfully.")

    # =====================================================
    # Select Features
    # =====================================================

    FEATURES = [
        "lag_1",
        "lag_2",
        "lag_3",
        "rolling_7",
        "temperatureMax",
        "temperatureMin",
        "humidity",
        "windSpeed",
        "pressure",
        "year",
        "month",
        "day_of_month",
        "day_of_week",
        "week_of_year"
    ]

    TARGET = "energy_sum"

    X = daily_df[FEATURES]

    y = daily_df[TARGET]

    print("\nFeatures Selected")

    for feature in FEATURES:
        print("✓", feature)

    print("\nTarget :", TARGET)

    print("\nFeature Matrix Shape :", X.shape)
    print("Target Shape         :", y.shape)

    # =====================================================
    # Split Dataset
    # =====================================================

    from sklearn.model_selection import train_test_split
    from sklearn.metrics import (
        mean_absolute_error,
        mean_squared_error,
        r2_score,
    )
    from xgboost import XGBRegressor
    import joblib
    import numpy as np

    print("\nSplitting dataset...")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
    )

    print(f"Training Samples : {len(X_train)}")
    print(f"Testing Samples  : {len(X_test)}")

    # =====================================================
    # Train Model
    # =====================================================

    print("\nTraining XGBoost model...")

    model = XGBRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=6,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        objective="reg:squarederror"
    )

    model.fit(X_train, y_train)

    print("Training completed.")

    # =====================================================
    # Prediction
    # =====================================================

    print("\nMaking predictions...")

    predictions = model.predict(X_test)

    # =====================================================
    # Evaluation
    # =====================================================

    mae = mean_absolute_error(y_test, predictions)
    rmse = np.sqrt(mean_squared_error(y_test, predictions))
    r2 = r2_score(y_test, predictions)

    print("\n" + "=" * 60)
    print("MODEL PERFORMANCE")
    print("=" * 60)

    print(f"MAE  : {mae:.4f}")
    print(f"RMSE : {rmse:.4f}")
    print(f"R²   : {r2:.4f}")

    # =====================================================
    # Feature Importance
    # =====================================================

    importance = pd.DataFrame(
        {
            "Feature": FEATURES,
            "Importance": model.feature_importances_,
        }
    )

    importance = importance.sort_values(
        by="Importance",
        ascending=False,
    )

    print("\nTop Feature Importance\n")
    print(importance)

    # =====================================================
    # Save Model
    # =====================================================

    MODEL_PATH = BASE_DIR / "model.pkl"

    joblib.dump(model, MODEL_PATH)

    print("\nModel saved successfully.")
    print(MODEL_PATH)

    print("\nTraining pipeline completed successfully.")
    
    
if __name__ == "__main__":
    main()